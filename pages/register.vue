<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100 py-8">
    <div class="w-full max-w-2xl p-8 space-y-6 bg-base-200 rounded-xl shadow-lg">
      <!-- Theme Selector -->
      <div class="flex justify-end">
        <ThemeSelector />
      </div>
      
      <div class="text-center">
        <h1 class="text-3xl font-bold text-primary mb-2">ลงทะเบียนพนักงานใหม่</h1>
        <p class="text-base-content/70">กรุณากรอกข้อมูลเพื่อเพิ่มพนักงานใหม่</p>
      </div>
      
      <form @submit.prevent="onRegister" class="space-y-4">
        <!-- Personal Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-base-content/80" for="fullName">ชื่อ-นามสกุล *</label>
            <input
              id="fullName"
              v-model="formData.full_name"
              type="text"
              required
              class="input input-bordered w-full"
              placeholder="ชื่อ-นามสกุล"
            />
          </div>
          <div>
            <label class="block mb-1 text-base-content/80" for="studentCode">รหัสนักศึกษา/พนักงาน</label>
            <input
              id="studentCode"
              v-model="formData.studentcode"
              type="text"
              class="input input-bordered w-full"
              placeholder="รหัสนักศึกษา/พนักงาน"
            />
          </div>
        </div>

        <!-- Contact Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-base-content/80" for="email">อีเมล *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="input input-bordered w-full"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label class="block mb-1 text-base-content/80" for="username">ชื่อผู้ใช้ *</label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="input input-bordered w-full"
              placeholder="ชื่อผู้ใช้"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-base-content/80" for="password">รหัสผ่าน *</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="input input-bordered w-full"
              placeholder="••••••••"
              minlength="6"
            />
          </div>
          <div>
            <label class="block mb-1 text-base-content/80" for="confirmPassword">ยืนยันรหัสผ่าน *</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="input input-bordered w-full"
              placeholder="••••••••"
              minlength="6"
            />
          </div>
        </div>

        <!-- Role Selection -->
        <div>
          <label class="block mb-1 text-base-content/80" for="role">ตำแหน่ง *</label>
          <select
            id="role"
            v-model="formData.role"
            required
            class="select select-bordered w-full"
          >
            <option value="">เลือกตำแหน่ง</option>
            <option value="employee">พนักงาน</option>
            <option value="manager">ผู้จัดการ</option>
          </select>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          {{ isLoading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียนพนักงาน' }}
        </button>
      </form>

      <!-- Navigation Links -->
      <div class="flex justify-between text-sm mt-4">
        <NuxtLink to="/" class="link link-hover">กลับหน้าหลัก</NuxtLink>
        <NuxtLink to="/login" class="link link-hover">เข้าสู่ระบบ</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

useHead({ title: 'ลงทะเบียนพนักงาน' })

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const confirmPassword = ref('')

const formData = reactive({
  full_name: '',
  studentcode: '',
  email: '',
  username: '',
  password: '',
  role: ''
})

const validateForm = () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // Check if passwords match
  if (formData.password !== confirmPassword.value) {
    errorMessage.value = 'รหัสผ่านไม่ตรงกัน'
    return false
  }

  // Check password length
  if (formData.password.length < 6) {
    errorMessage.value = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    return false
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    errorMessage.value = 'รูปแบบอีเมลไม่ถูกต้อง'
    return false
  }

  return true
}

const onRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    // Call the registration API
    const response = await $fetch('/api/register', {
      method: 'POST',
      body: {
        username: formData.username,
        password: formData.password,
        full_name: formData.full_name,
        email: formData.email,
        role: formData.role,
        studentcode: formData.studentcode || undefined,
      }
    })

    if (response.status === 'success') {
      successMessage.value = 'ลงทะเบียนพนักงานสำเร็จ!'
      
      // Clear form
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      confirmPassword.value = ''
      
      // // Redirect after 2 seconds
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
    } else {
      errorMessage.value = response.message || 'เกิดข้อผิดพลาดในการลงทะเบียน'
    }

  } catch (error) {
    console.error('Registration error:', error)
    if (error.data?.message) {
      errorMessage.value = error.data.message
    } else {
      errorMessage.value = 'เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
