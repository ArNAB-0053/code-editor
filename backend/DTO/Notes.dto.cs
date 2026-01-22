namespace backend.DTO
{
    public class GetNotesDTO
    {
        public string CodeId { get; set; }
        //public string NoteId { get; set; }
    }

    public class  RenameReqDTO 
    {
        public string CodeId { get; set; }
        public string Title { get; set; }
     }
}
