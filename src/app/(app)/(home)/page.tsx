import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {

  

  return (
    <div className="p-4">
      <div className='flex flex-col gap-y-4 '>
        <div>
          <Button
            variant="elevated"
          >
            I am a button
          </Button>
        </div>
        <div>
          <Input className="border" placeholder='I am an input' />
        </div>
        <div >
          <Progress value={50} className='w-full'/>
        </div>
        <div>
          <Textarea  className='w-full border rounded-b-sm' placeholder="I am a textarea w-full" />
        </div>
        <div>
          <Checkbox className = 'border-2 ' aria-placeholder="hii" />
        </div>
      </div>
    </div>
    // <h6 className="text-9xl">Hello</h6>
  );
}
