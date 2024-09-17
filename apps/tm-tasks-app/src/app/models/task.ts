export type Task  = { 
    taskId: string;
    status: string;
    description?: string;
    title: string;
    assignedTo?: string;
    reportedBy: string;
    dueDate: string;
}
