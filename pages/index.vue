<!-- make landing page -->
<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-200">
    <!-- Navigation -->
    <CommonNav 
      subtitle="หน้าแรก"
      :breadcrumbs="[
        { label: 'หน้าแรก' }
      ]"
      :showLogout="false"
    >
      <template #actions>
        <NuxtLink to="/login" class="btn btn-primary btn-sm">
          เข้าสู่ระบบ
        </NuxtLink>
        <NuxtLink to="/register" class="btn btn-outline btn-sm">
          สมัครสมาชิก
        </NuxtLink>
      </template>
    </CommonNav>

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span class="block text-base-content">ยินดีต้อนรับสู่</span>
            <span class="block text-primary">ระบบจัดการเวลาพนักงาน</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl text-base-content/80">
            ระบบจัดการเวลาพนักงานที่ครบวงจร พร้อมให้บริการคุณด้วยเทคโนโลยีล่าสุด
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <NuxtLink to="/login" class="btn btn-primary btn-lg">
                เริ่มต้นใช้งาน
              </NuxtLink>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <NuxtLink to="/about" class="btn btn-outline btn-lg">
                เรียนรู้เพิ่มเติม
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-12 bg-base-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary font-semibold tracking-wide uppercase">คุณสมบัติ</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl text-base-content">
            ทุกสิ่งที่คุณต้องการในที่เดียว
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature 1 -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="card-body text-center">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-content mx-auto">
                  <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 class="card-title justify-center mt-4">จัดการพนักงานง่ายดาย</h3>
                <p class="mt-2 text-base-content/70">เพิ่ม แก้ไข และลบข้อมูลพนักงานได้อย่างรวดเร็วและมีประสิทธิภาพ</p>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="card-body text-center">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-secondary-content mx-auto">
                  <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 class="card-title justify-center mt-4">วิเคราะห์ข้อมูล</h3>
                <p class="mt-2 text-base-content/70">ดูรายงานและสถิติการทำงานของพนักงานแบบเรียลไทม์</p>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div class="card-body text-center">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-accent-content mx-auto">
                  <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 class="card-title justify-center mt-4">ความปลอดภัยสูง</h3>
                <p class="mt-2 text-base-content/70">ระบบรักษาความปลอดภัยระดับสูงด้วยเทคโนโลยีล่าสุด</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="py-12 bg-base-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary">500+</div>
            <div class="text-base-content/70 mt-2">บริษัทที่ใช้งาน</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-secondary">10,000+</div>
            <div class="text-base-content/70 mt-2">พนักงานที่ใช้งาน</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-accent">99.9%</div>
            <div class="text-base-content/70 mt-2">ความน่าเชื่อถือ</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-12 bg-primary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-primary-content mb-4">
          พร้อมเริ่มต้นใช้งานแล้วหรือยัง?
        </h2>
        <p class="text-primary-content/80 mb-8 max-w-2xl mx-auto">
          เข้าร่วมกับบริษัทชั้นนำที่ไว้วางใจเราในการจัดการเวลาพนักงาน
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register" class="btn btn-secondary btn-lg">
            เริ่มต้นใช้งานฟรี
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
            ติดต่อเรา
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-base-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <span class="text-2xl font-bold text-primary">Emplo2</span>
            <p class="text-base-content/70">
              ระบบจัดการพนักงานที่ครบวงจร พร้อมให้บริการคุณด้วยเทคโนโลยีล่าสุด
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-base-content/70 hover:text-primary">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-base-content/70 hover:text-primary">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-base-content/70 hover:text-primary">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold tracking-wider uppercase text-base-content">เมนู</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li><NuxtLink to="/" class="text-base-content/70 hover:text-primary transition-colors">หน้าแรก</NuxtLink></li>
                  <li><NuxtLink to="/about" class="text-base-content/70 hover:text-primary transition-colors">เกี่ยวกับเรา</NuxtLink></li>
                  <li><NuxtLink to="/contact" class="text-base-content/70 hover:text-primary transition-colors">ติดต่อเรา</NuxtLink></li>
                  <li><NuxtLink to="/login" class="text-base-content/70 hover:text-primary transition-colors">เข้าสู่ระบบ</NuxtLink></li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-semibold tracking-wider uppercase text-base-content">บริการ</h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li><a href="#" class="text-base-content/70 hover:text-primary transition-colors">จัดการพนักงาน</a></li>
                  <li><a href="#" class="text-base-content/70 hover:text-primary transition-colors">บันทึกเวลา</a></li>
                  <li><a href="#" class="text-base-content/70 hover:text-primary transition-colors">รายงาน</a></li>
                  <li><a href="#" class="text-base-content/70 hover:text-primary transition-colors">API</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-base-300 pt-8">
          <p class="text-base-content/70 text-center">
            &copy; 2024 Emplo2. สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({ 
  title: 'หน้าแรก - Emplo2',
  meta: [
    { name: 'description', content: 'ระบบจัดการเวลาพนักงานที่ครบวงจร พร้อมให้บริการคุณด้วยเทคโนโลยีล่าสุด' }
  ]
})
</script>

<style scoped>
/* Custom styles if needed */
</style>