export type ReactElementType = React.ReactElement<any, string | 
    (
        (props: any) => React.ReactElement<any, string | 
        (new (props: any) => React.Component<any, any, any>)> | 
        null
    ) | 
    (new (props: any) => React.Component<any, any, any>)>;

