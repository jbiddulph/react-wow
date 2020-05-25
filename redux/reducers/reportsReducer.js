const initialState ={
    reports: [],
    reportsReading: [],
    reportsRead: [],
    isLoadingReports: true
}

const reports = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_REPORTS_FROM_SERVER':
            return{
                ...state,
                reports:action.payload,
                reportsReading:action.payload.filter(report => !report.saved),
                reportsRead: action.payload.filter(report => report.saved)
            };
        case 'ADD_REPORT':
            return{
                ...state,
                reports:[action.payload, ...state.reports],
                reportsReading:[action.payload, ... state.reportsReading]
            };
        case 'MARK_REPORT_AS_SAVED':
            return{
                ...state,
                reports: state.reports.map(report => {
                    if(report.name == action.payload.name){
                        return {...report, saved: true}
                    }
                    return report;
                }),
                reportsRead: [...state.reportsRead, action.payload],
                reportsReading:state.reportsReading.filter(
                    report => report.name !== action.payload.name
                )
            };
        case 'TOGGLE_IS_LOADING_REPORTS':
            return{
                ...state,
                isLoadingReports:action.payload
            };
        case 'MARK_REPORT_AS_UNSAVED':
            return {
                ...state,
                reports: state.reports.map(report=>{
                    if(report.name == action.payload.name){
                        return {...report, saved:false}
                    }
                    return report
                }),
                reportsRead: state.reportsRead.filter(
                    report => report.name !== action.payload.name
                ),
                reportsReading: [...state.reportsReading,action.payload]
            };
        case 'DELETE_REPORT':
            return {
                reports: state.reports.filter(report => report.name !== action.payload.name),
                reportsReading: state.reportsReading.filter(report => report.name !== action.payload.name),
                reportsRead: state.reportsRead.filter(report => report.name !== action.payload.name),
            }

        default:
            return state;
    }
}

export default reports;
