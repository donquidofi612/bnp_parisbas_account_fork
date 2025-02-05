<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';

export default {
    setup() {
definePageMeta({
  middleware: [auth],
})
        
    },
  components: {
    PageHeader,
  },
  data() {
    return {
      dataToPass: {
        current: "Contact Us",
        list: [
          'Pages', 'Contact Us'
        ]
      },
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

                <!-- Start::row-1 -->
                <div class="row justify-content-center">
                    <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-xm-12">
                        <div class="card custom-card overflow-hidden">
                            <div class="card-body p-0">
                                <div class="contact-page-banner">
                                    <div class="text-center">
                                        <h3 class="fw-semibold text-fixed-white">Contact US !</h3>
                                        <h6 class="text-fixed-white mb-4 px-sm-0 px-3">Have any questions ? We would love to hear from you. </h6>
                                        <button class="btn btn-success btn-wave">Contact <i class="ri-phone-line ms-1 align-middle"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                        <div class="row">
                            <div class="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <div class="card custom-card contactus-form overflow-hidden">
                                    <div class="card-header">
                                        <div class="card-title">
                                            Get In Touch !
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row gy-3">
                                            <div class="col-xl-6">
                                                <label for="contact-address-firstname" class="form-label">First Name :</label>
                                                <input type="text" class="form-control form-control-light" id="contact-address-firstname" placeholder="Enter Name">
                                            </div>
                                            <div class="col-xl-6">
                                                <label for="contact-address-lastname" class="form-label">Last Name :</label>
                                                <input type="text" class="form-control form-control-light" id="contact-address-lastname" placeholder="Enter Name">
                                            </div>
                                            <div class="col-xl-6">
                                                <label for="contact-address-phone" class="form-label">Phone No :</label>
                                                <input type="text" class="form-control form-control-light" id="contact-address-phone" placeholder="Enter Phone No">
                                            </div>
                                            <div class="col-xl-6">
                                                <label for="contact-address-email" class="form-label">Email Id :</label>
                                                <input type="email" class="form-control form-control-light" id="contact-address-email" placeholder="Enter Email Id">
                                            </div>
                                            <div class="col-xl-6">
                                                <label for="contact-address-address" class="form-label">Address :</label>
                                                <textarea class="form-control form-control-light" id="contact-address-address" rows="2"></textarea>
                                            </div>
                                            <div class="col-xl-6">
                                                <label for="contact-mail-message" class="form-label">Message :</label>
                                                <textarea class="form-control form-control-light" id="contact-mail-message" rows="2"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div class="text-center">
                                            <button class="btn btn-primary-light btn-wave">Send Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <div class="card custom-card contactus-form overflow-hidden">
                                    <div class="card-body">
                                        <iframe src="https://www.google.com/maps/place/Banco+BPI+%7C+Faro/@37.0177959,-7.9685528,11659m/data=!3m1!1e3!4m23!1m16!4m15!1m6!1m2!1s0xd0552c4c7dc7ec1:0x14873c7e99845eab!2sBanco+BPI+%7C+Faro,+Edf+Tridente,+Av.+5+de+Outubro+19+B,+8000-077+Faro,+Portugal!2m2!1d-7.9273531!2d37.0177345!1m6!1m2!1s0xd0552c4c7dc7ec1:0x14873c7e99845eab!2sBanco+BPI+%7C+Faro,+Edf+Tridente,+Av.+5+de+Outubro+19+B,+8000-077+Faro,+Portugal!2m2!1d-7.9273531!2d37.0177345!3e0!3m5!1s0xd0552c4c7dc7ec1:0x14873c7e99845eab!8m2!3d37.0177345!4d-7.9273531!16s%2Fg%2F11cmcxkvrr?hl=en&entry=ttu&g_ep=EgoyMDI1MDIwMy4wIKXMDSoASAFQAw%3D%3D" height="370" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End::row-1 -->
</template>

<style scoped></style>

