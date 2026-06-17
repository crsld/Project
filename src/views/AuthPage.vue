<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const error = ref('')
const message = ref('')

</script>