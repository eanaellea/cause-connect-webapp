import { useGlobalStore } from '../store'
import { createPluginQuery, CreatePluginBody } from '@/services/mainApi/queries/javaApp'

export const createPluginAction = async (plugin: File, createPluginBody: CreatePluginBody): Promise<boolean> => {
  const pluginResponse = await createPluginQuery(plugin, createPluginBody)
  if (pluginResponse === null) {
    return false
  }
  const plugins = useGlobalStore.getState().plugins
  useGlobalStore.setState({ plugins: [...plugins, pluginResponse] })
  return true
}
