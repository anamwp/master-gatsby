import {MdStore as icon} from 'react-icons/md';
export default {
    name: 'storeSettings', 
    title: 'Settings',
    type: 'document', 
    icon,
    fields:[
        {
            name: 'name', 
            title: 'Store Name', 
            type: 'string', 
            description: 'Name of the pizza'
        }, 
        {
            name: 'slicemaster', 
            title: 'Slicemasters currently slicing', 
            type: 'array', 
            of: [{ type: 'reference', to: [{type: 'person'}] }]
        }, 
        {
            name: 'hotSlices', 
            title: 'Hot slices available in the case', 
            type: 'array', 
            of: [{ type: 'reference', to: [{type: 'pizza'}] }]
        }
    ], 
}