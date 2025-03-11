import { AxiosError } from "axios"

export type Response<T> = {
	message?: string
	data: T[]
	pagination: Pagination
}

export type ResponseData<T> = {
	message?: string
	data: T[]
}

export type ResponseSingleData<T> = {
	message?: string
	data: T
}

export type ResponseError = AxiosError<{
	message?: string
	error?: string[]
}>

export type Pagination = {
	count: number
	next?: string | null
	previous?: string | null
}
