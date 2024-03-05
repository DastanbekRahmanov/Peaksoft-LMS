import { toast } from 'react-toastify'

export const showSuccess = (message) => {
   toast.success(message, { position: 'top-right' })
}
const showError = (message) => {
   toast.error(message, { position: 'top-right', hideProgressBar: true })
}
export default showError

export const courseLinks = (id) => {
   return [
      {
         name: 'Материалы',
         path: `/instructor/materials/${id}`,
      },
      {
         name: 'Студенты',
         path: `/instructor/course-students/${id}`,
      },
   ]
}

export const courseCrumbs = (courseName, lastPath) => {
   return [
      { path: '/instructor', to: '/instructor', name: 'Kурсы' },
      {
         path: '',
         to: '',
         name: courseName,
      },
      {
         path: '',
         to: '',
         name: lastPath,
      },
   ]
}
export const taskCrumbs = (courseName, lastPath, currentId) => {
   return [
      { path: '/instructor', to: '/instructor', name: 'Kурсы' },
      {
         path: '',
         to: `/instructor/materials/${currentId}`,
         name: courseName,
      },
      {
         path: '',
         to: '',
         name: lastPath,
      },
   ]
}

export const setError = (state, { payload }) => {
   state.status = 'rejected'
   state.error = `Ошибка: ${payload}`
}

export const setLoading = (state) => {
   state.status = 'loading'
}

export const routeHandler = (action, idLesson, navigate, id) => {
   switch (action) {
      case 'Видеоурок':
         navigate(`/instructor/video/${id}/${idLesson}`)
         break
      case 'Презентация':
         navigate(`/instructor/presentataion/${id}/${idLesson}`)

         break
      case 'Задание':
         navigate(`/instructor/task/${id}/${idLesson}`)

         break
      case 'Ссылка':
         navigate(`/instructor/lesson-link/${id}/${idLesson}`)

         break
      case 'Тест':
         navigate(`/instructor/test/${id}/${idLesson}`)
         break
      default:
         navigate()
   }
}
export const getYoutubeThumbnail = (link) => {
   if (link) {
      const youtubeThumbnailId = link.substr(link.indexOf('=') + 1, 11)
      return `https://www.youtube.com/embed/${youtubeThumbnailId}`
   }
   return ''
}
