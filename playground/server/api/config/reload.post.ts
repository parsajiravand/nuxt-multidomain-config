import { reloadConfigs } from '../../../src/server'

export default defineEventHandler(async (event) => {
  try {
    reloadConfigs()

    return {
      success: true,
      message: 'Configurations reloaded successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to reload configurations'
    })
  }
})
