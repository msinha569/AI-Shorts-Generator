import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";

export const MenuOptions = [
    {
        id: 1,
        name: 'Dashboard',
        path: '/dashboard',
        icon:PanelsTopLeft
    },
    {
        id: 2,
        name: 'Create New',
        path: '/dashboard/create-new',
        icon:FileVideo
    },
    {
        id: 3,
        name: 'Upgrage',
        path: '/dashboard/upgrade',
        icon:ShieldPlus
    },
    {
        id: 4,
        name: 'Account',
        path: '/dashboard/account',
        icon:CircleUser
    }
]

export const contentOptions = [
    'Custom Prompt',
    'Random AI Story',
    'Scary Story',
    'Historical Fact',
    'Bed Time Story',
    'Motivational',
    'Fun Facts'
]

export const StyleOptions = [
    {
        name: 'Realistic',
        image:  '/realistic.jpg'
    },
    {
        name: 'Cartoon',
        image: '/cartoon.jpg'
    },
    {
        name: 'Comic',
        image: '/comic.jpg'
    },
    {
        name: 'GTA',
        image: '/gta.jpg'
    },
    {
        name: 'WaterColor',
        image: '/watercolor.jpg'
    }
]