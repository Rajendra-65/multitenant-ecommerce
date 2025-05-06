import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
          <Input placeholder='I am an input' />
        </div>
        <div>
          <progress value={50} />
        </div>
        <div>
          <textarea placeholder="I am a textarea" />
        </div>
        <div>
          <Checkbox aria-placeholder="hii" />
        </div>
      </div>
    </div>
  );
}
