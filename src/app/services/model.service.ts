import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SnackbarMessage} from "../shared/snackbar/snackbar-decorator";
import {ModelType} from "../models/ModelType";
import {Model} from "../models/Model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private jobsUrl = 'http://localhost:8080/api/models';

  constructor(private http: HttpClient) { }

  // Inference -------------------------------------------------------------

  @SnackbarMessage(
    'Inference job started successfully.',
    'Error in starting inference job.')
  startInferenceJob(model: Model): Observable<string> {
    return this.http.post(this.jobsUrl + '/start-inference', model, {responseType: 'text'});
  }

  @SnackbarMessage(
    'Inference Job stopped successfully.',
    'Error in stopping inference job.')
  stopInferenceJob(): Observable<string> {
    return this.http.post(this.jobsUrl + '/stop-inference', null, {responseType: 'text'});
  }

  getInferenceJobStatus(): Observable<string> {
    return this.http.get(this.jobsUrl + '/inference-job-status', {responseType: 'text'});
  }

  // Training -------------------------------------------------------------

  @SnackbarMessage(
    'Training job started successfully.',
    'Error in starting training job.')
  startTrainingJob(modelType: ModelType): Observable<string> {
    return this.http.post(this.jobsUrl + '/start-training', modelType, {responseType: 'text'});
  }

  @SnackbarMessage(
    'Training Job stopped successfully.',
    'Error in stopping training job.')
  stopTrainingJob(): Observable<string> {
    return this.http.post(this.jobsUrl + '/stop-training', null, {responseType: 'text'});
  }

  getTrainingJobStatus(): Observable<string> {
    return this.http.get(this.jobsUrl + '/training-job-status', {responseType: 'text'});
  }

  // Models -------------------------------------------------------------

  getModelTypes(): Observable<ModelType[]> {
    return this.http.get<ModelType[]>(this.jobsUrl + '/model-types');
  }

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.jobsUrl + '/models');
  }

  @SnackbarMessage(
    'Initialization successful.',
    'Error initializing.')
  initialize(): Observable<null> {
    return this.http.post<null>(this.jobsUrl + '/initialize', null);
  }

  @SnackbarMessage(
    'Model deleted successfully.',
    'Error deleting model.')
  deleteModel(modelId: number): Observable<null> {
    return this.http.delete<null>(this.jobsUrl + '/' + modelId);
  }

}
