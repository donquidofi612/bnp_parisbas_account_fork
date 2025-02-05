<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Liste des Virements Programmés -->
  <div class="row">
    <div class="col-xl-12">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Virements Programmés
          </div>
        </div>
        <div class="card-body">
          <!-- Tableau des virements programmés -->
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Bénéficiaire</th>
              <th scope="col">IBAN</th>
              <th scope="col">Montant (MAD)</th>
              <th scope="col">Date de Programmation</th>
              <th scope="col">Récurrence</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(transfer, index) in scheduledTransfers" :key="index">
              <td>{{ transfer.beneficiary }}</td>
              <td>{{ transfer.iban }}</td>
              <td>{{ transfer.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</td>
              <td>{{ transfer.scheduleDate }}</td>
              <td>{{ transfer.recurring !== 'non' ? transfer.recurring : 'Non' }}</td>
              <td>
                <button class="btn btn-sm btn-primary me-2" @click="editTransfer(index)">
                  Modifier
                </button>
                <button class="btn btn-sm btn-danger" @click="cancelTransfer(index)">
                  Annuler
                </button>
              </td>
            </tr>
            <tr v-if="scheduledTransfers.length === 0">
              <td colspan="6" class="text-center">Aucun virement programmé</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- End::row-1 -->

  <!-- Start:: Modal de modification -->
  <div class="modal fade" id="editTransferModal" tabindex="-1" aria-labelledby="editTransferModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editTransferModalLabel">Modifier le Virement</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateTransfer">
            <div class="mb-3">
              <label for="editBeneficiary" class="form-label">Bénéficiaire</label>
              <input
                  type="text"
                  class="form-control"
                  id="editBeneficiary"
                  v-model="currentTransfer.beneficiary"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="editIban" class="form-label">IBAN du Bénéficiaire</label>
              <input
                  type="text"
                  class="form-control"
                  id="editIban"
                  v-model="currentTransfer.iban"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="editAmount" class="form-label">Montant (MAD)</label>
              <input
                  type="number"
                  class="form-control"
                  id="editAmount"
                  v-model="currentTransfer.amount"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="editScheduleDate" class="form-label">Date de Programmation</label>
              <input
                  type="date"
                  class="form-control"
                  id="editScheduleDate"
                  v-model="currentTransfer.scheduleDate"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="editRecurring" class="form-label">Récurrence</label>
              <select
                  class="form-select"
                  id="editRecurring"
                  v-model="currentTransfer.recurring"
              >
                <option value="non">Non</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End:: Modal de modification -->
</template>

<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';
import { ref } from 'vue';

export default {
  setup() {
    definePageMeta({
      middleware: [auth],
    });

    // Liste des virements programmés
   // const scheduledTransfers = ref([
//      {
  //      beneficiary: 'Ali Baba',
//        iban: 'MA64000111112222333344445555',
   //     amount: 1500,
  //      scheduleDate: '2024-09-30',
 //       recurring: 'mensuel',
 //     },
//      {
   //     beneficiary: 'Omar Khayyam',
  //      iban: 'MA64000111112222333344445566',
   //     amount: 2000,
    //    scheduleDate: '2024-10-05',
  //      recurring: 'hebdomadaire',
//      },
//    ]);

    // Virement en cours de modification
    const currentTransfer = ref({
      beneficiary: '',
      iban: '',
      amount: 0,
      scheduleDate: '',
      recurring: 'non',
    });

    // Fonction pour éditer un virement
    const editTransfer = (index: number) => {
      currentTransfer.value = { ...scheduledTransfers.value[index] };
      $('#editTransferModal').modal('show');
    };

    // Fonction pour mettre à jour le virement
    const updateTransfer = () => {
      const index = scheduledTransfers.value.findIndex(
          (transfer) => transfer.iban === currentTransfer.value.iban
      );
      if (index !== -1) {
        scheduledTransfers.value[index] = { ...currentTransfer.value };
        $('#editTransferModal').modal('hide');
      }
    };

    // Fonction pour annuler un virement
    const cancelTransfer = (index: number) => {
      scheduledTransfers.value.splice(index, 1);
    };

    // Données du composant PageHeader
    const dataToPass = {
      current: "Virements Programmés",
      list: ['Virements', 'Virements Programmés']
    };

    return {
      dataToPass,
      scheduledTransfers,
      currentTransfer,
      editTransfer,
      updateTransfer,
      cancelTransfer
    };
  },
  components: {
    PageHeader
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}

.card-header {
  background: #007bff;
  color: #fff;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.table {
  margin-bottom: 0;
}

.btn-sm {
  font-size: 0.875rem;
}

.modal-content {
  border-radius: 12px;
}
</style>
