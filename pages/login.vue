<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-xl shadow-lg">
      <!-- Theme Selector -->
      <div class="flex justify-end">
        <ThemeSelector />
      </div>
      
      <div class="text-center">
        <h1 class="text-3xl font-bold text-primary mb-2">เข้าสู่ระบบ</h1>
        <p class="text-base-content/70">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
      </div>
      <form @submit.prevent="onLogin" class="space-y-4">
        <div>
          <label class="block mb-1 text-base-content/80" for="email">อีเมล</label>
          <input
            id="email"
            v-model="email"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label class="block mb-1 text-base-content/80" for="password">รหัสผ่าน</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input input-bordered w-full"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" class="btn btn-primary w-full">เข้าสู่ระบบ</button>
      </form>
      <div class="flex justify-between text-sm mt-2">
        <NuxtLink to="/" class="link link-hover">กลับหน้าหลัก</NuxtLink>
        <div class="flex gap-4">
          <NuxtLink to="/register" class="link link-hover">ลงทะเบียนพนักงาน</NuxtLink>
          <a class="link link-hover" href="#">ลืมรหัสผ่าน?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

useHead({ title: 'Login' })

const email = ref('')
const password = ref('')
const router = useRouter()

const onLogin = () => {
  if (email.value === 'admin' && password.value === 'admin') {
    alert('เข้าสู่ระบบสำเร็จ');
    router.push('/');
  } else {
    alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }
}
</script>

<style scoped>
</style>