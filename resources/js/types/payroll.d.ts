interface Item {
    label: string;
    url: string;
    icon: React.ComponentType<LucideProps>;
}

export interface navigationLinks {
    title: string;
    items: Item[];
}

export interface sslProfile {
    salary_grade: number;
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
    step7: number;
    step8: number;
};


export interface formatColumnTypes {
    type: string;
    description: string;
};

export interface payrollsColumnTypes {
    name: string;
    rate: number;
    quantity: number;
    type: string;
    position: string;
    tardiness: number;
    compensation: number;
    deduction: number;
    gross_amount: number;
};
