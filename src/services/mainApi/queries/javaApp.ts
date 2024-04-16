import { query } from '../setup'

export interface CreatePluginBody {
  name: string
  description: string
  author: string
}

export interface PlugInResponse {
  id: string
  name: string
  description: string
  author: string
}

export const createPluginQuery = async (plugin: File, createPluginBody: CreatePluginBody): Promise<PlugInResponse | null> => {
  try {
    const formData = new FormData()
    formData.append('plugin', plugin)
    formData.append('name', createPluginBody.name)
    formData.append('description', createPluginBody.description)
    formData.append('author', createPluginBody.author)
    const result = await query.post('java-app/plugins', { body: formData })
    const pluginResponse = await result.json<PlugInResponse>()
    return pluginResponse
  } catch (error) {
    return null
  }
}
