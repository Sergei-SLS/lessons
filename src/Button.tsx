

type titleButtonType = {
    title: string
}

export const Button = ({ title } : titleButtonType) => {
    return <button>{title}</button>
}