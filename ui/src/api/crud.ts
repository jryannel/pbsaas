import { notifyError, notifySuccess } from "../helper/notify";
import { QueryClient, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { ListResult, RecordListOptions, RecordOptions, RecordService } from "pocketbase";
import { pb } from "./pb";
import { queryClient } from "./query";


class KeyFactory {
  constructor(public collection: string) { }
  list() {
    return [this.collection, "list"];
  }
  search(filter: string) {
    return [this.collection, "search", filter];
  }
  all() {
    return [this.collection, "all"];
  }
  one(id: string) {
    return [this.collection, "one", id];
  }
  first() {
    return [this.collection, "first"];
  }
  create() {
    return [this.collection, "create"];
  }
  update() {
    return [this.collection, "update"];
  }
  delete() {
    return [this.collection, "delete"];
  }
}


export class Crud<T> {
  keys: KeyFactory;
  col: RecordService<T>;
  client: QueryClient;

  constructor(public collection: string) {
    this.keys = new KeyFactory(collection);
    this.col = pb.collection<T>(collection);
    this.client = queryClient;
  }
  list(page: number, perPage: number, options?: RecordListOptions): UseQueryOptions<ListResult<T>> {
    return {
      queryKey: this.keys.list(),
      queryFn: () => this.col.getList(page, perPage, options)
    };
  }
  fetchList(page: number, perPage: number, options?: RecordListOptions): Promise<ListResult<T>> {
    return queryClient.fetchQuery(this.list(page, perPage, options));
  }
  invalidateList(): void {
    queryClient.invalidateQueries({ queryKey: this.keys.list() });
  }
  search(page: number, perPage: number, term: string, options?: RecordListOptions): UseQueryOptions<ListResult<T>> {
    const filter = `name ~ "%${term}%"`;
    const opts = { ...options, filter };
    return {
      queryKey: this.keys.search(term),
      queryFn: () => this.col.getList(page, perPage, opts)
    };
  }
  fetchSearch(page: number, perPage: number, term: string, options?: RecordListOptions): Promise<ListResult<T>> {
    return queryClient.fetchQuery(this.search(page, perPage, term, options));
  }
  invalidateSearch(term: string): void {
    queryClient.invalidateQueries({ queryKey: this.keys.search(term) });
  }
  one(id: string, options?: RecordOptions): UseQueryOptions<T> {
    return {
      queryKey: this.keys.one(id),
      queryFn: () => this.col.getOne(id, options)
    };
  }
  fetchOne(id: string, options?: RecordOptions): Promise<T> {
    return queryClient.fetchQuery(this.one(id, options));
  }
  invalidateOne(id: string): void {
    queryClient.invalidateQueries({ queryKey: this.keys.one(id) });
  }
  all(options?: RecordListOptions): UseQueryOptions<T[]> {
    return {
      queryKey: this.keys.all(),
      queryFn: () => this.col.getFullList(options)
    };
  }
  fetchAll(options?: RecordListOptions): Promise<T[]> {
    return queryClient.fetchQuery(this.all(options));
  }
  invalidateAll(): void {
    queryClient.invalidateQueries({ queryKey: this.keys.all() });
  }
  first(filter: string, options?: RecordOptions): UseQueryOptions<T> {
    return {
      queryKey: this.keys.first(),
      queryFn: () => this.col.getFirstListItem(filter, options)
    };
  }
  fetchFirst(filter: string, options?: RecordOptions): Promise<T> {
    return queryClient.fetchQuery(this.first(filter, options));
  }
  invalidateFirst(): void {
    queryClient.invalidateQueries({ queryKey: this.keys.first() });
  }
  create(): UseMutationOptions<T, Error, { data: Partial<T>, options?: RecordOptions; }> {
    return {
      mutationKey: this.keys.create(),
      mutationFn: ({ data, options }) => this.col.create(data, options),
      onSuccess: () => notifySuccess("Item has been created"),
      onError: (error) => notifyError(error.message || "Failed to create item")
    };
  }
  doCreate(data: Partial<T>, options?: RecordOptions): Promise<T> {
    return queryClient.getMutationCache().build(queryClient, this.create()).execute({ data, options });
  }
  invalidateCreate(): void {
    queryClient.invalidateQueries({ queryKey: this.keys.create() });
  }
  update(): UseMutationOptions<T, Error, { id: string, data: Partial<T>, options?: RecordOptions; }> {
    return {
      mutationKey: this.keys.update(),
      mutationFn: ({ id, data, options }) => this.col.update(id, data, options),
      onSuccess: () => notifySuccess("Item has been updated"),
      onError: (error) => notifyError(error.message || "Failed to update item")
    };
  }
  doUpdate(id: string, data: Partial<T>, options?: RecordOptions): Promise<T> {
    return queryClient.getMutationCache().build(queryClient, this.update()).execute({ id, data, options });
  }
  invalidateUpdate(): void {
    queryClient.invalidateQueries({ queryKey: this.keys.update() });
  }
  delete(): UseMutationOptions<boolean, Error, { id: string, options?: RecordOptions; }> {
    return {
      mutationKey: this.keys.delete(),
      mutationFn: ({ id, options }) => this.col.delete(id, options),
      onSuccess: () => notifySuccess("Item has been deleted"),
      onError: (error) => notifyError(error.message || "Failed to delete item")
    };
  }
  doDelete(id: string, options?: RecordOptions): Promise<boolean> {
    return queryClient.getMutationCache().build(queryClient, this.delete()).execute({ id, options });
  }
}

