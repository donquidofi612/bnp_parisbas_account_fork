<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Vue d'ensemble des cartes bancaires -->
  <div class="row">
    <!-- Carte de Crédit -->
    <div class="col-lg-4 col-md-6 mb-4" v-for="card in creditCards" :key="card.id">
      <div class="card custom-card card-bank shadow-lg">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="fw-bold mb-1">{{ card.bankName }}</h5>
              <p class="text-muted mb-1">**** {{ card.lastDigits }}</p>
              <h4 class="fw-semibold">{{ card.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
              <p class="text-muted mb-0">Limite : {{ card.limit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</p>
            </div>
            <div>
              <img :src="`/images/cards/${card.type}.png`" class="card-logo" alt="card-logo">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-1 -->

  <!-- Start::row-2 - Transactions et Graphe des dépenses -->
  <div class="row">
    <!-- Transactions récentes par carte -->
    <div class="col-lg-8 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Transactions Récentes
          </div>
        </div>
        <div class="card-body p-0">
          <table class="table text-nowrap table-hover mb-0">
            <thead>
            <tr>
              <th>Carte</th>
              <th>Date</th>
              <th>Description</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in recentTransactions" :key="transaction.id">
              <td>**** {{ transaction.cardLastDigits }}</td>
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="transaction.amount > 0 ? 'text-success' : 'text-danger'">
                {{ transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Graphique des Dépenses par Carte -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Dépenses par Carte
          </div>
        </div>
        <div class="card-body">
          <apexchart type="pie" :options="expensesOptions" :series="expensesSeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-2 -->
</template>

<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';
import { ref } from 'vue';
import ApexCharts from 'vue3-apexcharts';

export default {
  setup() {
    definePageMeta({
      middleware: [auth],
    });

    // Informations sur les cartes bancaires
    const creditCards = ref([
      { id: 1, bankName: 'BPI', lastDigits: '1234', balance: 5000, limit: 20000, type: 'visa' },
      { id: 2, bankName: 'BPI Banco', lastDigits: '5678', balance: 3000, limit: 15000, type: 'mastercard' },
      { id: 3, bankName: 'CIH', lastDigits: '9101', balance: 8000, limit: 30000, type: 'visa' }
    ]);

    // Transactions récentes avec les cartes bancaires
    const recentTransactions = ref([
      { id: 1, cardLastDigits: '5678', date: '2022-02-14', description: 'Dépôt éffectué', amount: 500000, type: 'Crédit' },
      { id: 2, cardLastDigits: '5678', date: '2018-10-09', description: 'Dépôt éffectué ', amount: 830000, type: 'Crédit' },
      { id: 3, cardLastDigits: '5678', date: '2012-02-14', description: 'Dépôt éffectué', amount: 520000, type: 'Crédit' },
    ]);

    // Données pour le graphique des dépenses par carte
    const expensesSeries = ref([2000, 1500, 3000]); // Dépenses par carte
    const expensesOptions = ref({
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['BPI', 'BPI Banco', 'CIH'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    });

    const dataToPass = {
      current: "Cartes bancaires",
      list: ['Comptes', 'Cartes bancaires']
    };

    return {
      dataToPass,
      creditCards,
      recentTransactions,
      expensesSeries,
      expensesOptions
    };
  },
  components: {
    PageHeader,
    ApexCharts
  },
};
</script>

<style scoped>
/* Styles communs pour les cartes d'information */
.card-bank {
  border-radius: 12px;
  padding: 15px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
}

.card-logo {
  width: 60px;
  height: auto;
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
</style>
