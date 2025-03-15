

type titleButtonType = {
    title: string
    onClick?: () => void
}

export const Button = ({ title, onClick } : titleButtonType) => {
    return <button onClick={onClick}>{title}</button>
}