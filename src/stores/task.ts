import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import TaskService from '@/services/TaskService'
import type { ITask } from '@/interfaces/ITask'

export const useTaskStore = defineStore('task', () => {
  const service = ref(new TaskService())
  const loading = ref(true)
  const taskModal = ref(false)

  const tasks: Ref<ITask[]> = ref([])

  async function getTasks() {
    loading.value = true
    try {
      tasks.value = (await service.value.fetchTasks()) || []
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      loading.value = false
    }
  }

  async function createTask(newData: any) {
    try {
      service.value = new TaskService()
      await service.value.createTask(newData)
      getTasks()
    } catch (error) {
      console.error('Error creating entity:', error)
    }
  }

  async function isCompleted(id: number, completed: boolean) {
    try {
      await service.value.isCompleted(id, completed)
      getTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return { tasks, loading, taskModal, getTasks, createTask, isCompleted }
})
