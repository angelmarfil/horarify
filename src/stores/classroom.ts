import {defineStore } from 'pinia'
import {ref, type Ref} from 'vue'
import GenericService from '@/services/GenericService'
import type { IEventData } from '@/interfaces/IEventData'

export const useClassroomStore = defineStore('classroom', () => {
    const service = ref()
    

    //state
    const data: Ref<IEventData[]> = ref([])

    //actions
    async function getData(){
        try {
            service.value = new GenericService<IEventData>('Classroom')
            data.value = await service.value.fetchEntities()
            return true
        }

        catch(error){
            console.error(error)
        }
    }

    async function createEntity(newData: string) {
        if (!service.value) service.value = new GenericService<IEventData>('Classroom');
        try {
          const createdEntity = await service.value.createEntity(newData);
          data.value.push(createdEntity);
        } catch (error) {
          console.error('Error creating entity:', error);
        }
      }

      async function updateEntity(id: number, updatedData: string) {
        if (!service.value) service.value = new GenericService<IEventData>('Classroom');
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

    async function deleteEntity(id: number){
        try {
            service.value = new GenericService<IEventData>('Classroom')
            await service.value.deleteEntity(id)
        }

        catch(error){
            console.error(error)
        }
    }


    return {data, getData, createEntity, updateEntity, deleteEntity}
})