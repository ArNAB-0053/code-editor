import { IModalProps } from '@/@types/_base'
import TiptapEditor from '@/components/tiptap'
import { AModal } from '@/components/ui/antd'

const TiptapEditorModal =({ open, setOpen }: IModalProps) => {
  return (
    <AModal
      // title="Publish to GitHub"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      className="overflow-hidden w-[40rem]!"
      useSideIndicator={false}
    >
        <TiptapEditor/>
    </AModal>
  )
}

export default TiptapEditorModal