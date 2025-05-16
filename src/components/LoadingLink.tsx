import { Skeleton } from '@mui/material'

export default function LoadingLinksScreen() {
  return (
    <section
      className="w-full flex flex-col gap-5 p-10 bg-dl-white rounded-xl sm:w-[95%] sm:self-center"
      aria-busy="true"
    >
      {/* Adjust the width and height values as needed for your design */}
      <Skeleton variant="rounded" width="70%" height="48px" />
      <Skeleton
        variant="rounded"
        width="100%"
        height="24px"
        sx={{ margin: '8px 0' }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height="46px"
        sx={{ margin: '8px 0' }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height="228px"
        sx={{ margin: '8px 0' }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height="228px"
        sx={{ margin: '8px 0' }}
      />
    </section>
  )
}
