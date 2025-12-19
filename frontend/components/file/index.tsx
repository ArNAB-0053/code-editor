"use client"
import ShareToAndByMe from './share'

export const MAX_SHARE_VISIBLE = {
  TABLE: 8,
  CARD: 3,
  LIST: 2,
};

const FilesPage = () => {
  return (
    <div className='mt-2'>
        {/* SHARE */}
      <ShareToAndByMe />
    </div>
  )
}

export default FilesPage