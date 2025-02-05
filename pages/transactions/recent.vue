<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Filtres de recherche et total des transactions -->
  <div class="row mb-4">
    <!-- Total Débits -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card transaction-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-arrow-down-left-circle"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Total Débits</p>
            <h4 class="fw-semibold mb-1">{{ totalDebits.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Crédits -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card transaction-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-arrow-up-right-circle"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Total Crédits</p>
            <h4 class="fw-semibold mb-1">{{ totalCredits.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Solde Actuel -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card transaction-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-wallet2"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Solde Actuel</p>
            <h4 class="fw-semibold mb-1">{{ currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-1 -->

  <!-- Start::row-2 - Tableau des Transactions Récentes -->
  <div class="row">
    <div class="col-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Transactions Récentes
          </div>
          <div class="card-options">
            <div class="input-group">
              <input type="text" class="form-control" v-model="searchQuery" placeholder="Rechercher une transaction...">
              <button class="btn btn-primary" @click="filterTransactions">Rechercher</button>
            </div>
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
              <th>Solde Après Transaction</th>
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
              <td>{{ transaction.balanceAfter.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-2 -->
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

    // Transactions récentes
    const transactions = ref([
      {
        "id": 1,
        "date": "14/02/2022",
        "description": "Dépôt éffectué",
        "type": "Crédit",
        "amount": 500000,
        "balanceAfter": 1350000
      },
      {
        "id": 2,
        "date": "09/10/2018",
        "description": "Dépôt éffectué",
        "type": "Crédit",
        "amount": 830000,
        "balanceAfter": 520000
      },
      {
        "id": 3,
        "date": "14/02/2012",
        "description": "Dépôt éffectué",
        "type": "Crédit",
        "amount": 520000,
        "balanceAfter": 0
      }
    ]);

    // Calcul du total des débits
    const totalDebits = computed(() => {
      return transactions.value
          .filter(t => t.type === 'Débit')
          .reduce((sum, t) => sum + t.amount, 0);
    });

    // Calcul du total des crédits
    const totalCredits = computed(() => {
      return transactions.value
          .filter(t => t.type === 'Crédit')
          .reduce((sum, t) => sum + t.amount, 0);
    });

    // Calcul du solde actuel (dernier solde après transaction)
    const currentBalance = computed(() => {
      const lastTransaction = transactions.value[transactions.value.length - 1];
      return lastTransaction ? lastTransaction.balanceAfter : 0;
    });

    // Filtrage des transactions
    const searchQuery = ref('');
    const filteredTransactions = computed(() => {
      if (!searchQuery.value) {
        return transactions.value;
      }
      return transactions.value.filter(transaction => {
        return transaction.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            transaction.date.includes(searchQuery.value);
      });
    });

    // Fonction de recherche
    const filterTransactions = () => {
      // Cette fonction est appelée lors de la recherche.
      // Les transactions sont déjà filtrées via la propriété calculée `filteredTransactions`.
    };

    const dataToPass = {
      current: "Transactions récentes",
      list: ['Transactions', 'Transactions récentes']
    };

    return {
      dataToPass,
      transactions,
      totalDebits,
      totalCredits,
      currentBalance,
      searchQuery,
      filteredTransactions,
      filterTransactions
    };
  },
  components: {
    PageHeader
  },
};
</script>

<style scoped>
/* Styles communs pour les cartes d'information */
.transaction-card {
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

/* Styles supplémentaires */
.table th, .table td {
  padding: 10px;
  font-size: 0.9rem;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.card-options {
  display: flex;
  align-items: center;
}

.card-options .input-group {
  width: 100%;
  max-width: 300px;
}
</style>
