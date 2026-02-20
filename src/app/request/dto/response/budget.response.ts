export class getAllBudgetDto {
    request_id:number
    request_project:string
    request_amt:string
    request_desc:string
    request_by:string
    request_at:Date
    Capex:{
        capex_id:string
        avaiable_amt:string
        reserved_amtL:string
        used_amt:string

    }
}