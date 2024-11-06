import { api } from '@/libs/axios'

interface GetActivitiesHistoryRequest {
  from?: string
  until?: string
}

interface GetActivitiesHistoryResponse {
  activities: {
    data: {
      date: string
      activityType: 'STREAK' | 'INACTIVE' | 'REST'
    }[]
    from: string
    until: string
  }
}

export async function getActivitiesHistory({
  from,
  until,
}: GetActivitiesHistoryRequest): Promise<GetActivitiesHistoryResponse> {
  const response = await api.get<GetActivitiesHistoryResponse>(`/activities`, {
    params: {
      from,
      until,
    },
  })

  return response.data
}
