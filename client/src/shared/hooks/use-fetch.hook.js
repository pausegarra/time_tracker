import React from 'react'

export function useFetch (service, method) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [, setErrors] = React.useState(null)

  const executeFetching = React.useCallback(async () => {
    try {
      const data = await service[method]()
      setData(data)
    } catch (err) {
      setErrors(() => {
        throw new Error(err)
      })
    } finally {
      setIsLoading(false)
    }
  }, [method, service])

  React.useEffect(() => {
    executeFetching()
  }, [executeFetching])

  function refresh () {
    executeFetching()
  }

  return { isLoading, data, refresh }
}
