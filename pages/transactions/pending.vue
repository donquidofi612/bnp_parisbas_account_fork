<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Filtres de recherche et informations des transactions en attente -->
  <div class="row mb-4">
    <!-- Nombre total de transactions en attente -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card pending-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-clock-history"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Transactions en attente</p>
            <h4 class="fw-semibold mb-1">{{ pendingTransactions.length }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Montant total des transactions en attente -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card pending-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-currency-exchange"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Montant Total en Attente</p>
            <h4 class="fw-semibold mb-1">{{ totalPendingAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtre de recherche -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="input-group">
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Rechercher une transaction en attente...">
        <button class="btn btn-primary" @click="filterTransactions">Rechercher</button>
      </div>
    </div>
  </div>
  <!-- End::row-1 -->

  <!-- Start::row-2 - Tableau des Transactions en Attente -->
  <div class="row">
    <div class="col-12">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Transactions en Attente
          </div>
          <div class="card-options">
            <button class="btn btn-secondary ms-2" @click="resetFilters">Réinitialiser</button>
          </div>
        </div>
        <div class="card-body p-0">
          <table class="table text-nowrap table-hover mb-0">
            <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in filteredTransactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="transaction.type === 'Crédit' ? 'text-success' : 'text-danger'">
                {{ transaction.type }}
              </td>
              <td :class="transaction.type === 'Crédit' ? 'text-success' : 'text-danger'">
                {{ transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
              </td>
              <td :class="getStatusClass(transaction.status)">
                {{ transaction.status }}
              </td>
              <td>
                <button class="btn btn-primary btn-sm me-1" @click="approveTransaction(transaction)">Approuver</button>
                <button class="btn btn-danger btn-sm" @click="rejectTransaction(transaction)">Rejeter</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- End::row-2 -->
</template>

<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';
import { ref, computed } from 'vue';

export default {
  setup() {
    definePageMeta({
      middleware: [auth],
    });

    // Transactions en attente
    const pendingTransactions = ref([
      { id: 1, date: '28/02/2025', description: 'Virement', type: 'Débit', amount: -10000, status: 'En Attente' },
     // { id: 2, date: '28/02/2025', description: 'Paiement carte bancaire', type: 'Débit', amount: -2500, status: 'Effectué' },
    //  { id: 3, date: '03/02/2024', description: 'Prélèvement automatique', type: 'Débit', amount: -1500, status: 'En Attente' },
    //  { id: 4, date: '02/10/2024', description: 'Virement reçu', type: 'Crédit', amount: 3000, status: 'En Attente' },
    //  { id: 5, date: '01/10/2024', description: 'Virement programmé', type: 'Débit', amount: -1000, status: 'En Cours' },
      // Ajouter plus de transactions en attente pour illustrer la page complète
    ]);

    // Calcul du montant total des transactions en attente
 //   const totalPendingAmount = computed(() => {
 //     return pendingTransactions.value.reduce((sum, t) => sum + t.amount, 0);
 //   });

    // Filtrage des transactions
    const searchQuery = ref('');
    const filteredTransactions = computed(() => {
      if (!searchQuery.value) {
        return pendingTransactions.value;
      }
      return pendingTransactions.value.filter(transaction => {
        return transaction.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            transaction.date.includes(searchQuery.value);
      });
    });

    // Fonction pour approuver une transaction
    const approveTransaction = (transaction) => {
      transaction.status = 'Approuvé';
    };

    // Fonction pour rejeter une transaction
    const rejectTransaction = (transaction) => {
      transaction.status = 'Rejeté';
    };

    // Classe CSS pour le statut
    const getStatusClass = (status) => {
      switch (status) {
        case 'En Attente':
          return 'text-warning';
        case 'En Cours':
          return 'text-info';
        case 'Approuvé':
          return 'text-success';
        case 'Rejeté':
          return 'text-danger';
        default:
          return '';
      }
    };

    // Fonction de recherche
    const filterTransactions = () => {
      // Les transactions sont déjà filtrées via la propriété calculée `filteredTransactions`.
    };

    // Réinitialisation des filtres
    const resetFilters = () => {
      searchQuery.value = '';
    };

    const dataToPass = {
      current: "Transactions en attente",
      list: ['Transactions', 'Transactions en attente']
    };

    return {
      dataToPass,
      pendingTransactions,
      totalPendingAmount,
      searchQuery,
      filteredTransactions,
      approveTransaction,
      rejectTransaction,
      getStatusClass,
      filterTransactions,
      resetFilters
    };
  },
  components: {
    PageHeader
  },
};
</script>

<style scoped>
/* Styles communs pour les cartes d'information */
.pending-card {
  border-radius: 12px;
  padding: 15px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
}

.card-body {
  padding: 20px;
}

.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: #f8f9fa;
  border-radius: 50%;
}

.shadow-lg {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: #007bff !important;
}

.text-warning {
  color: #ffc107 !important;
}

.text-info {
  color: #17a2b8 !important;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

/* Styles supplémentaires */
.table th, .table td {
  padding: 10px;
  font-size: 0.9rem;
}

.card-options {
  display: flex;
  align-items: center;
}

.card-options .btn {
  margin-left: 10px;
}
</style>
