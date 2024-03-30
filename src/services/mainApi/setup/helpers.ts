import toast from 'react-hot-toast'

export function handleError (e: Error): void {
  console.log('error', e)
  toast.error('An error occurred')
}
