import { otherRequest } from './request'

export function getAddress() {
    return otherRequest({
        url: "/cityjson",
        params: {
            ie: "utf-8"
        }
    })
}