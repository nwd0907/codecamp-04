import { useRouter } from 'next/router'
import BoardDetailUI from './BoardDetail.presenter'
import { FETCH_BOARD } from './BoardDetail.queries'
import { useQuery } from '@apollo/client'

export default function BoardDetail(){
    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD, {
      variables: { boardId: router.query.boardId },
    })

    return <BoardDetailUI data={data}/>
}