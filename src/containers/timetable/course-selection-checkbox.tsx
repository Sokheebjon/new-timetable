import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";

interface TCourseSelectionCheckboxProps {
    courseList: {label: string, value: string}[],
    onValueChange?: (e: string) => void
    defaultValue?: string
}

export default function CourseSelectionCheckbox({courseList, onValueChange, defaultValue}: TCourseSelectionCheckboxProps) {


    return (
        <>
            <RadioGroup className="flex gap-2" onValueChange={onValueChange} defaultValue={defaultValue}>
                {courseList.map(course => {
                    return (
                        <div className="flex items-center space-x-2" key={course.value}>
                            <RadioGroupItem value={course.value} id={course.value}/>
                            <Label htmlFor={course.value}>{course.label}</Label>
                        </div>
                    )
                })}
            </RadioGroup>
        </>
    )
}