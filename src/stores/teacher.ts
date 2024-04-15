import {defineStore } from 'pinia'
import {ref, type Ref} from 'vue'
import GenericService from '@/services/GenericService'
import type { IEventData } from '@/interfaces/IEventData'

export const useTeacherStore = defineStore('teacher', () => {
    const service = ref()
    

    //state
    const data: Ref<IEventData[]> = ref([])

    //actions
    async function getData(){
        try {
            service.value = new GenericService<IEventData>('Teacher')
            data.value = await service.value.fetchEntities()
            return true
        }

        catch(error){
            console.error(error)
        }
    }

    async function createEntity(newData: string) {
        if (!service.value) service.value = new GenericService<IEventData>('Teacher');
        try {
          const createdEntity = await service.value.createEntity(newData);
          data.value.push(createdEntity);
        } catch (error) {
          console.error('Error creating entity:', error);
        }
      }

      async function updateEntity(id: number, updatedData: string) {
        if (!service.value) service.value = new GenericService<IEventData>('Teacher');
        try {
          const updatedEntity = await service.value.updateEntity(id, updatedData);
          const index = data.value.findIndex(item => item.id === id);
          if (index !== -1) {
            data.value[index] = {...data.value[index], ...updatedEntity};
          }
        } catch (error) {
          console.error('Error updating entity:', error);
        }
      }

      async function deleteEntity(id: number) {
        if (!service.value) service.value = new GenericService<IEventData>('Teacher');
        try {
            await service.value.deleteEntity(id);
            const index = data.value.findIndex(item => item.id === id);
            if (index !== -1) {
                data.value.splice(index, 1);
            }
        } catch (error) {
            console.error('Error deleting entity:', error);
        }
    }
    

    return { data, getData, createEntity, updateEntity, deleteEntity };
})