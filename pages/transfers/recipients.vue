<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Liste des Bénéficiaires -->
  <div class="row">
    <div class="col-xl-12">
      <div class="card custom-card shadow-lg">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="card-title">
            Gestion des Bénéficiaires
          </div>
          <button class="btn btn-primary" @click="showAddBeneficiaryModal">
            Ajouter un Bénéficiaire
          </button>
        </div>
        <div class="card-body">
          <!-- Tableau des bénéficiaires -->
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">IBAN</th>
              <th scope="col">Banque</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(beneficiary, index) in beneficiaries" :key="index">
              <td>{{ beneficiary.name }}</td>
              <td>{{ beneficiary.iban }}</td>
              <td>{{ beneficiary.bank }}</td>
              <td>{{ beneficiary.email }}</td>
              <td>
                <button class="btn btn-sm btn-primary me-2" @click="editBeneficiary(index)">
                  Modifier
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteBeneficiary(index)">
                  Supprimer
                </button>
              </td>
            </tr>
            <tr v-if="beneficiaries.length === 0">
              <td colspan="5" class="text-center">Aucun bénéficiaire ajouté</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- End::row-1 -->

  <!-- Start:: Modal d'ajout et de modification -->
  <div class="modal fade" id="beneficiaryModal" tabindex="-1" aria-labelledby="beneficiaryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="beneficiaryModalLabel">
            {{ isEditing ? 'Modifier le Bénéficiaire' : 'Ajouter un Bénéficiaire' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveBeneficiary">
            <div class="mb-3">
              <label for="beneficiaryName" class="form-label">Nom du Bénéficiaire</label>
              <input
                  type="text"
                  class="form-control"
                  id="beneficiaryName"
                  v-model="currentBeneficiary.name"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="beneficiaryIban" class="form-label">IBAN</label>
              <input
                  type="text"
                  class="form-control"
                  id="beneficiaryIban"
                  v-model="currentBeneficiary.iban"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="beneficiaryBank" class="form-label">Banque</label>
              <input
                  type="text"
                  class="form-control"
                  id="beneficiaryBank"
                  v-model="currentBeneficiary.bank"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="beneficiaryEmail" class="form-label">Email</label>
              <input
                  type="email"
                  class="form-control"
                  id="beneficiaryEmail"
                  v-model="currentBeneficiary.email"
                  required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? 'Enregistrer les modifications' : 'Ajouter' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End:: Modal d'ajout et de modification -->
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

    // Liste des bénéficiaires
    const beneficiaries = ref([
      // {
      //   name: 'Ali Baba',
      //   iban: 'MA64000111112222333344445555',
      //   bank: 'Banque Populaire',
      //   email: 'ali.baba@example.com',
      // },
      // {
      //   name: 'Omar Khayyam',
      //   iban: 'MA64000111112222333344445566',
      //   bank: 'Attijariwafa Bank',
      //   email: 'omar.khayyam@example.com',
      // },
    ]);

    // Bénéficiaire en cours d'édition ou d'ajout
    const currentBeneficiary = ref({
      name: '',
      iban: '',
      bank: '',
      email: '',
    });

    // Indicateur de mode d'édition
    const isEditing = ref(false);

    // Fonction pour afficher le modal d'ajout
    const showAddBeneficiaryModal = () => {
      isEditing.value = false;
      currentBeneficiary.value = {
        name: '',
        iban: '',
        bank: '',
        email: '',
      };
      $('#beneficiaryModal').modal('show');
    };

    // Fonction pour éditer un bénéficiaire
    const editBeneficiary = (index: number) => {
      isEditing.value = true;
      currentBeneficiary.value = { ...beneficiaries.value[index] };
      $('#beneficiaryModal').modal('show');
    };

    // Fonction pour sauvegarder le bénéficiaire (ajout ou modification)
    const saveBeneficiary = () => {
      if (isEditing.value) {
        const index = beneficiaries.value.findIndex(
            (beneficiary) => beneficiary.iban === currentBeneficiary.value.iban
        );
        if (index !== -1) {
          beneficiaries.value[index] = { ...currentBeneficiary.value };
        }
      } else {
        beneficiaries.value.push({ ...currentBeneficiary.value });
      }
      $('#beneficiaryModal').modal('hide');
    };

    // Fonction pour supprimer un bénéficiaire
    const deleteBeneficiary = (index: number) => {
      beneficiaries.value.splice(index, 1);
    };

    // Données du composant PageHeader
    const dataToPass = {
      current: "Gestion des Bénéficiaires",
      list: ['Virements', 'Gestion des Bénéficiaires']
    };

    return {
      dataToPass,
      beneficiaries,
      currentBeneficiary,
      isEditing,
      showAddBeneficiaryModal,
      editBeneficiary,
      saveBeneficiary,
      deleteBeneficiary
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
