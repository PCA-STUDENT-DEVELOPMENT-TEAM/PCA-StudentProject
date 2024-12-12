type NavigationLinkType = 'payrollAdmin' | 'payrollEmployee' | 'biometicsAdmin' | 'biometicsEmployee'

export interface AuthenticatedLayoutAdminProps {
    children: React.ReactNode,
    pageTitle: string,
    navigationType: NavigationLinkType
}

interface Links {
    label : string,
    url: string,
    icon: React.ComponentType<LucideProps>
}

export interface NavigationLinks {
    title : string,
    links : Links[]
}

