export class HealthRecord {
    constructor(
        public recording_path: string,
        public transcription: string,
        public health_record: string,
        public processing_outputs: IndividualOutput[],
        public parent_id: any,
        
        public id?: number,
        public updated_at?: string,
        public created_at?: string,
        public created_by?: string,
        public last_modified_by?: string,
    ) {
    }
}

export interface IndividualOutput {
    strategy_id: number,
    strategy_name: string,
    strategy_output: ConcreteStrategyOutput,
}

export interface ConcreteStrategyOutput {
    output: any,
    ner?: NamedEntityRecognition[],
    other?: any
}

export interface NamedEntityRecognition {
    name: string,
    result: any,
    tags: NamedEntityRecognitionTags[]
}

export interface NamedEntityRecognitionTags {
    name: string,
    description: string,
    detected_entities?: string[]
}

export interface HealthRecordRelatedResponse {
    result: boolean,
    healthRecord: HealthRecord,
    message: string
}
