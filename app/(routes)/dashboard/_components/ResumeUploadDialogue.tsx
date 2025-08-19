import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, Loader2, Loader2Icon, Sparkle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

function ResumeUploadDialogue({ openResumeUpload, setOpenResumeUpload }: any) {
  const [selectFile, setSelectFile] = useState<any>();
  const [loader,setLoader]=useState<boolean>(false)
  const OnFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file.name);
      setSelectFile(file);
    }
  };

  const onUploadAndAnalyze=async ()=>{
    setLoader(true)
    const recordId=uuidv4();
    const formData=new FormData();
    formData.append("recordId",recordId);
    formData.append("resumeFile", selectFile);
    const result=await axios.post('/api/ai-resume-agent',formData);
    console.log(result.data);
    setLoader(false)
  }
  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uoload Resume PDF file</DialogTitle>
          <DialogDescription>
            <div>
              <label
                htmlFor="resumeUpload"
                className="flex items-center flex-col justify-center p-7 border border-dashed rounded-xl hover:bg-slate-200  cursor-pointer"
              >
                <File className="h-10 w-10" />

                {selectFile ? (
                  <h2 className="mt-3 text-blue-600">{selectFile?.name}</h2>
                ) : (
                  <h2 className="mt-3">Click here to upload PDF file</h2>
                )}
              </label>
              <input
                type="file"
                id="resumeUpload"
                accept="application/pdf"
                className="hidden"
                onChange={OnFileChange}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"}>Cancel</Button>
          <Button disabled={!selectFile||loader}   onClick={onUploadAndAnalyze} >
           {loader?<Loader2Icon className="animate-spin"/>:<Sparkles />}    Upload & Analyz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeUploadDialogue;
