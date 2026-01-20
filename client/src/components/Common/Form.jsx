import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Form = ({ formControls, formData, setFormData, onSubmit, buttonText, }) => {

    const renderInputComponent = (getControlItems) => {
        let element = null;
        const value = formData[getControlItems.name] || ""

        switch (getControlItems.componentType) {
            case 'input':
                element = (<Input
                    name={getControlItems.name}
                    value={value}
                    placeholder={getControlItems.placeholder}
                    id={getControlItems.name} type={getControlItems.type}
                    onChange={(event) => setFormData({ ...formData, [getControlItems.name]: event.target.value })}

                />

                )
                break;
            case 'select':
                element =
                    (<Select onValueChange={(value) => setFormData({ ...formData, [getControlItems.name]: value })} value={value}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItems.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItems.options && getControlItems.options.length > 0 ?
                                getControlItems.options.map(optionItems =>
                                    <SelectItem key={optionItems.key} value={optionItems.id} >
                                        {optionItems.label}
                                    </SelectItem>) : null}
                        </SelectContent>
                    </Select>)

                break;
            case 'textarea':
                (element = <Textarea
                    name={getControlItems.name} value={value} placeholder={getControlItems.placeholder} id={getControlItems.name}
                    onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })} />

                )
                break;
            default:
                element = (<Input
                    name={getControlItems.name} value={value} placeholder={getControlItems.placeholder} id={getControlItems.name} type={getControlItems.type}
                    onChange={event => setFormData({ ...formData, [getControlItems.name]: event.target.value })}
                />

                )

        }
        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {formControls.map(controlItems =>
                    <div key={controlItems.name} className='w-full grid gap-5 ' >
                        <Label className='mb-1' htmlFor={controlItems.name}>{controlItems.label}</Label>
                        {
                            renderInputComponent(controlItems)
                        }
                    </div>
                )}
            </div>
            <Button type='submit' className="mt-2 w-full">{buttonText || 'Submit'}</Button>

        </form>
    )
}

export default Form