<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Informations générales du compte épargne -->
  <div class="row">
    <!-- Solde du compte épargne -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-piggy-bank"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Solde Épargne Actuel</p>
            <h4 class="fw-semibold mb-1">{{ savingsBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Intérêts accumulés -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-graph-up"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Intérêts Accumulés</p>
            <h4 class="fw-semibold mb-1">{{ accumulatedInterest.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Objectifs d'Épargne -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-flag"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Objectifs d'Épargne</p>
            <h4 class="fw-semibold mb-1">{{ savingsGoals.length }} Objectif(s)</h4>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-1 -->

  <!-- Start::row-2 - Historique des Transactions et Graphique des Performances -->
  <div class="row">
    <!-- Historique des Transactions d'Épargne -->
    <div class="col-lg-8 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Historique des Transactions d'Épargne
          </div>
        </div>
        <div class="card-body p-0 table-responsive">
          <table class="table text-nowrap table-hover mb-0">
            <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in savingsTransactions" :key="transaction.id">
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

    <!-- Graphique des Performances d'Épargne -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Graphique des Performances d'Épargne
          </div>
        </div>
        <div class="card-body">
          <apexchart type="area" :options="chartOptions" :series="chartSeries"></apexchart>
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

    // Données du compte épargne
    const savingsBalance = ref(1850000); // Solde épargne actuel
    const accumulatedInterest = ref(1200); // Intérêts accumulés
    const savingsGoals = ref([
      { id: 1, goal: 'Voyage', amount: 5000, progress: 75 },
      { id: 2, goal: 'Achat Voiture', amount: 15000, progress: 30 },
      { id: 3, goal: 'Éducation', amount: 10000, progress: 50 }
    ]); // Liste des objectifs d'épargne

    // Historique des transactions d'épargne
    const savingsTransactions = ref([
      { id: 1, date: '01/10/2024', description: 'Versement Mensuel', amount: 1000 },
      { id: 2, date: '30/09/2024', description: 'Intérêts Accumulés', amount: 100 },
      { id: 3, date: '29/09/2024', description: 'Virement vers Épargne', amount: 1500 },
      { id: 4, date: '28/09/2024', description: 'Retrait', amount: -500 },
      { id: 5, date: '27/09/2024', description: 'Achat Action', amount: -2000 }
    ]);

    // Données pour le graphique des performances d'épargne
    const chartSeries = ref([
      {
        name: "Solde Épargne",
        data: [18000, 18500, 19000, 19500, 20000]
      }
    ]);
    const chartOptions = ref({
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      },
      tooltip: {
        enabled: true
      }
    });

    const dataToPass = {
      current: "Compte épargne",
      list: ['Comptes', 'Compte épargne']
    };

    return {
      dataToPass,
      savingsBalance,
      accumulatedInterest,
      savingsGoals,
      savingsTransactions,
      chartSeries,
      chartOptions
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
.info-card {
  border-radius: 12px;
  padding: 10px;
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
