import React, {useState} from "react";
import { useImmer } from "use-immer";

export default function EditSkillForm({skill}) {
    <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input 
                        control={Input}
                        name='name'
                        placeholder='Name'
                        label='Name'
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <Form.Field 
                        label='Color'
                        name='color'
                        control={Select}
                        value={formState.color} 
                        options={colorOptions}
                        onChange={(e, data) => updateFormState( draft => {
                            draft.color = data.value;
                        })}
                    />
                    <Button type='submit'>Submit</Button>
                </Form.Group>
                {error ? <ErrorMessage error={error} /> : null }
    </Form>
}