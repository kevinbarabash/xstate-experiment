declare module 'constants' {
	import { ActivityMap, DefaultGuardType } from 'types';
	export const STATE_DELIMITER = ".";
	export const EMPTY_ACTIVITY_MAP: ActivityMap;
	export const DEFAULT_GUARD_TYPE: DefaultGuardType;
	export const TARGETLESS_KEY = "";
	//# sourceMappingURL=constants.d.ts.map
}
declare module 'environment' {
	export const IS_PRODUCTION: boolean;
	//# sourceMappingURL=environment.d.ts.map
}
declare module 'mapState' {
	export function mapState(stateMap: {
	    [stateId: string]: any;
	}, stateId: string): any;
	//# sourceMappingURL=mapState.d.ts.map
}
declare module 'stateUtils' {
	import { EventObject, StateNode, StateValue } from '.'; type Configuration<TC, TE extends EventObject> = Iterable<StateNode<TC, any, TE>>; type AdjList<TC, TE extends EventObject> = Map<StateNode<TC, any, TE>, Array<StateNode<TC, any, TE>>>;
	export const isLeafNode: (stateNode: StateNode<any, any, any>) => boolean;
	export function getChildren<TC, TE extends EventObject>(stateNode: StateNode<TC, any, TE>): Array<StateNode<TC, any, TE>>;
	export function getAllStateNodes<TC, TE extends EventObject>(stateNode: StateNode<TC, any, TE>): Array<StateNode<TC, any, TE>>;
	export function getConfiguration<TC, TE extends EventObject>(prevStateNodes: Iterable<StateNode<TC, any, TE>>, stateNodes: Iterable<StateNode<TC, any, TE>>): Iterable<StateNode<TC, any, TE>>;
	export function getAdjList<TC, TE extends EventObject>(configuration: Configuration<TC, TE>): AdjList<TC, TE>;
	export function getValue<TC, TE extends EventObject>(rootNode: StateNode<TC, any, TE>, configuration: Configuration<TC, TE>): StateValue;
	export function has<T>(iterable: Iterable<T>, item: T): boolean;
	export function nextEvents<TC, TE extends EventObject>(configuration: Array<StateNode<TC, any, TE>>): Array<TE['type']>;
	export function isInFinalState<TC, TE extends EventObject>(configuration: Array<StateNode<TC, any, TE>>, stateNode: StateNode<TC, any, TE>): boolean;
	export {};
	//# sourceMappingURL=stateUtils.d.ts.map
}
declare module 'actionTypes' {
	import { ActionTypes } from 'types';
	export const start = ActionTypes.Start;
	export const stop = ActionTypes.Stop;
	export const raise = ActionTypes.Raise;
	export const send = ActionTypes.Send;
	export const cancel = ActionTypes.Cancel;
	export const nullEvent = ActionTypes.NullEvent;
	export const assign = ActionTypes.Assign;
	export const after = ActionTypes.After;
	export const doneState = ActionTypes.DoneState;
	export const log = ActionTypes.Log;
	export const init = ActionTypes.Init;
	export const invoke = ActionTypes.Invoke;
	export const errorExecution = ActionTypes.ErrorExecution;
	export const errorPlatform = ActionTypes.ErrorPlatform;
	export const error = ActionTypes.ErrorCustom;
	export const update = ActionTypes.Update;
	export const choose = ActionTypes.Choose;
	export const pure = ActionTypes.Pure;
	//# sourceMappingURL=actionTypes.d.ts.map
}
declare module 'actions' {
	import { Action, Event, EventObject, SingleOrArray, SendAction, SendActionOptions, CancelAction, ActionObject, ActionType, Assigner, PropertyAssigner, AssignAction, ActionFunction, ActionFunctionMap, ActivityActionObject, ActionTypes, ActivityDefinition, RaiseAction, RaiseActionObject, DoneEvent, ErrorPlatformEvent, DoneEventObject, SendExpr, SendActionObject, PureAction, LogExpr, LogAction, LogActionObject, DelayFunctionMap, SCXML, ExprWithMeta, ChooseConditon, ChooseAction, AnyEventObject } from 'types';
	import * as actionTypes from 'actionTypes';
	import { State } from 'State';
	import { StateNode } from 'StateNode';
	export { actionTypes };
	export const initEvent: SCXML.Event<{
	    type: ActionTypes;
	}>;
	export function getActionFunction<TContext, TEvent extends EventObject>(actionType: ActionType, actionFunctionMap?: ActionFunctionMap<TContext, TEvent>): ActionObject<TContext, TEvent> | ActionFunction<TContext, TEvent> | undefined;
	export function toActionObject<TContext, TEvent extends EventObject>(action: Action<TContext, TEvent>, actionFunctionMap?: ActionFunctionMap<TContext, TEvent>): ActionObject<TContext, TEvent>;
	export const toActionObjects: <TContext, TEvent extends EventObject>(action?: string | RaiseAction<AnyEventObject> | ActionObject<TContext, TEvent> | ActionFunction<TContext, TEvent> | AssignAction<Required<TContext>, TEvent> | SendAction<TContext, TEvent, AnyEventObject> | ChooseAction<TContext, TEvent> | Action<TContext, TEvent>[] | undefined, actionFunctionMap?: Record<string, ActionObject<TContext, TEvent> | ActionFunction<TContext, TEvent>> | undefined) => ActionObject<TContext, TEvent>[];
	export function toActivityDefinition<TContext, TEvent extends EventObject>(action: string | ActivityDefinition<TContext, TEvent>): ActivityDefinition<TContext, TEvent>;
	/**
	 * Raises an event. This places the event in the internal event queue, so that
	 * the event is immediately consumed by the machine in the current step.
	 *
	 * @param eventType The event to raise.
	 */
	export function raise<TContext, TEvent extends EventObject>(event: Event<TEvent>): RaiseAction<TEvent> | SendAction<TContext, TEvent, TEvent>;
	export function resolveRaise<TEvent extends EventObject>(action: RaiseAction<TEvent>): RaiseActionObject<TEvent>;
	/**
	 * Sends an event. This returns an action that will be read by an interpreter to
	 * send the event in the next step, after the current step is finished executing.
	 *
	 * @param event The event to send.
	 * @param options Options to pass into the send event:
	 *  - `id` - The unique send event identifier (used with `cancel()`).
	 *  - `delay` - The number of milliseconds to delay the sending of the event.
	 *  - `to` - The target of this event (by default, the machine the event was sent from).
	 */
	export function send<TContext, TEvent extends EventObject, TSentEvent extends EventObject = AnyEventObject>(event: Event<TSentEvent> | SendExpr<TContext, TEvent, TSentEvent>, options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent, TSentEvent>;
	export function resolveSend<TContext, TEvent extends EventObject, TSentEvent extends EventObject>(action: SendAction<TContext, TEvent, TSentEvent>, ctx: TContext, _event: SCXML.Event<TEvent>, delaysMap?: DelayFunctionMap<TContext, TEvent>): SendActionObject<TContext, TEvent, TSentEvent>;
	/**
	 * Sends an event to this machine's parent.
	 *
	 * @param event The event to send to the parent machine.
	 * @param options Options to pass into the send event.
	 */
	export function sendParent<TContext, TEvent extends EventObject, TSentEvent extends EventObject = AnyEventObject>(event: Event<TSentEvent> | SendExpr<TContext, TEvent, TSentEvent>, options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent, TSentEvent>;
	/**
	 * Sends an update event to this machine's parent.
	 */
	export function sendUpdate<TContext, TEvent extends EventObject>(): SendAction<TContext, TEvent, {
	    type: ActionTypes.Update;
	}>;
	/**
	 * Sends an event back to the sender of the original event.
	 *
	 * @param event The event to send back to the sender
	 * @param options Options to pass into the send event
	 */
	export function respond<TContext, TEvent extends EventObject, TSentEvent extends EventObject = AnyEventObject>(event: Event<TEvent> | SendExpr<TContext, TEvent, TSentEvent>, options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent, AnyEventObject>;
	/**
	 *
	 * @param expr The expression function to evaluate which will be logged.
	 *  Takes in 2 arguments:
	 *  - `ctx` - the current state context
	 *  - `event` - the event that caused this action to be executed.
	 * @param label The label to give to the logged expression.
	 */
	export function log<TContext, TEvent extends EventObject>(expr?: string | LogExpr<TContext, TEvent>, label?: string): LogAction<TContext, TEvent>;
	export const resolveLog: <TContext, TEvent extends EventObject>(action: LogAction<TContext, TEvent>, ctx: TContext, _event: SCXML.Event<TEvent>) => LogActionObject<TContext, TEvent>;
	/**
	 * Cancels an in-flight `send(...)` action. A canceled sent action will not
	 * be executed, nor will its event be sent, unless it has already been sent
	 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
	 *
	 * @param sendId The `id` of the `send(...)` action to cancel.
	 */
	export const cancel: (sendId: string | number) => CancelAction;
	/**
	 * Starts an activity.
	 *
	 * @param activity The activity to start.
	 */
	export function start<TContext, TEvent extends EventObject>(activity: string | ActivityDefinition<TContext, TEvent>): ActivityActionObject<TContext, TEvent>;
	/**
	 * Stops an activity.
	 *
	 * @param activity The activity to stop.
	 */
	export function stop<TContext, TEvent extends EventObject>(activity: string | ActivityDefinition<TContext, TEvent>): ActivityActionObject<TContext, TEvent>;
	/**
	 * Updates the current context of the machine.
	 *
	 * @param assignment An object that represents the partial context to update.
	 */
	export const assign: <TContext, TEvent extends EventObject = EventObject>(assignment: Assigner<TContext, TEvent> | PropertyAssigner<TContext, TEvent>) => AssignAction<TContext, TEvent>;
	export function isActionObject<TContext, TEvent extends EventObject>(action: Action<TContext, TEvent>): action is ActionObject<TContext, TEvent>;
	/**
	 * Returns an event type that represents an implicit event that
	 * is sent after the specified `delay`.
	 *
	 * @param delayRef The delay in milliseconds
	 * @param id The state node ID where this event is handled
	 */
	export function after(delayRef: number | string, id?: string): string;
	/**
	 * Returns an event that represents that a final state node
	 * has been reached in the parent state node.
	 *
	 * @param id The final state node's parent state node `id`
	 * @param data The data to pass into the event
	 */
	export function done(id: string, data?: any): DoneEventObject;
	/**
	 * Returns an event that represents that an invoked service has terminated.
	 *
	 * An invoked service is terminated when it has reached a top-level final state node,
	 * but not when it is canceled.
	 *
	 * @param id The final state node ID
	 * @param data The data to pass into the event
	 */
	export function doneInvoke(id: string, data?: any): DoneEvent;
	export function error(id: string, data?: any): ErrorPlatformEvent & string;
	export function pure<TContext, TEvent extends EventObject>(getActions: (context: TContext, event: TEvent) => SingleOrArray<ActionObject<TContext, TEvent>> | undefined): PureAction<TContext, TEvent>;
	/**
	 * Forwards (sends) an event to a specified service.
	 *
	 * @param target The target service to forward the event to.
	 * @param options Options to pass into the send action creator.
	 */
	export function forwardTo<TContext, TEvent extends EventObject>(target: Required<SendActionOptions<TContext, TEvent>>['to'], options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent, AnyEventObject>;
	/**
	 * Escalates an error by sending it as an event to this machine's parent.
	 *
	 * @param errorData The error data to send, or the expression function that
	 * takes in the `context`, `event`, and `meta`, and returns the error data to send.
	 * @param options Options to pass into the send action creator.
	 */
	export function escalate<TContext, TEvent extends EventObject, TErrorData = any>(errorData: TErrorData | ExprWithMeta<TContext, TEvent, TErrorData>, options?: SendActionOptions<TContext, TEvent>): SendAction<TContext, TEvent, AnyEventObject>;
	export function choose<TContext, TEvent extends EventObject>(conds: Array<ChooseConditon<TContext, TEvent>>): ChooseAction<TContext, TEvent>;
	export function resolveActions<TContext, TEvent extends EventObject>(machine: StateNode<TContext, any, TEvent>, currentState: State<TContext, TEvent> | undefined, currentContext: TContext, _event: SCXML.Event<TEvent>, actions: Array<ActionObject<TContext, TEvent>>): [Array<ActionObject<TContext, TEvent>>, TContext];
	//# sourceMappingURL=actions.d.ts.map
}
declare module 'State' {
	import { StateValue, ActivityMap, EventObject, HistoryValue, ActionObject, EventType, StateConfig, SCXML, StateSchema, TransitionDefinition, Typestate } from 'types';
	import { StateNode } from 'StateNode';
	import { Actor } from 'Actor';
	export function stateValuesEqual(a: StateValue | undefined, b: StateValue | undefined): boolean;
	export function isState<TContext, TEvent extends EventObject, TStateSchema extends StateSchema<TContext> = any, TTypestate extends Typestate<TContext> = any>(state: object | string): state is State<TContext, TEvent, TStateSchema, TTypestate>;
	export function bindActionToState<TC, TE extends EventObject>(action: ActionObject<TC, TE>, state: State<TC, TE>): ActionObject<TC, TE>;
	export class State<TContext, TEvent extends EventObject = EventObject, TStateSchema extends StateSchema<TContext> = any, TTypestate extends Typestate<TContext> = {
	    value: any;
	    context: TContext;
	}> {
	    value: StateValue;
	    context: TContext;
	    historyValue?: HistoryValue | undefined;
	    history?: State<TContext, TEvent, TStateSchema>;
	    actions: Array<ActionObject<TContext, TEvent>>;
	    activities: ActivityMap;
	    meta: any;
	    events: TEvent[];
	    event: TEvent;
	    _event: SCXML.Event<TEvent>;
	    _sessionid: string | null;
	    /**
	     * Indicates whether the state has changed from the previous state. A state is considered "changed" if:
	     *
	     * - Its value is not equal to its previous value, or:
	     * - It has any new actions (side-effects) to execute.
	     *
	     * An initial state (with no history) will return `undefined`.
	     */
	    changed: boolean | undefined;
	    /**
	     * Indicates whether the state is a final state.
	     */
	    done: boolean | undefined;
	    /**
	     * The enabled state nodes representative of the state value.
	     */
	    configuration: Array<StateNode<TContext, any, TEvent>>;
	    /**
	     * The next events that will cause a transition from the current state.
	     */
	    nextEvents: EventType[];
	    /**
	     * The transition definitions that resulted in this state.
	     */
	    transitions: Array<TransitionDefinition<TContext, TEvent>>;
	    /**
	     * An object mapping actor IDs to spawned actors/invoked services.
	     */
	    children: Record<string, Actor>;
	    /**
	     * Creates a new State instance for the given `stateValue` and `context`.
	     * @param stateValue
	     * @param context
	     */
	    static from<TC, TE extends EventObject = EventObject>(stateValue: State<TC, TE> | StateValue, context?: TC | undefined): State<TC, TE>;
	    /**
	     * Creates a new State instance for the given `config`.
	     * @param config The state config
	     */
	    static create<TC, TE extends EventObject = EventObject>(config: StateConfig<TC, TE>): State<TC, TE>;
	    /**
	     * Creates a new `State` instance for the given `stateValue` and `context` with no actions (side-effects).
	     * @param stateValue
	     * @param context
	     */
	    static inert<TC, TE extends EventObject = EventObject>(stateValue: State<TC, TE> | StateValue, context: TC): State<TC, TE>;
	    /**
	     * Creates a new State instance.
	     * @param value The state value
	     * @param context The extended state
	     * @param historyValue The tree representing historical values of the state nodes
	     * @param history The previous state
	     * @param actions An array of action objects to execute as side-effects
	     * @param activities A mapping of activities and whether they are started (`true`) or stopped (`false`).
	     * @param meta
	     * @param events Internal event queue. Should be empty with run-to-completion semantics.
	     * @param configuration
	     */
	    constructor(config: StateConfig<TContext, TEvent>);
	    /**
	     * Returns an array of all the string leaf state node paths.
	     * @param stateValue
	     * @param delimiter The character(s) that separate each subpath in the string state node path.
	     */
	    toStrings(stateValue?: StateValue, delimiter?: string): string[];
	    toJSON(): Pick<this, Exclude<keyof this, "configuration" | "transitions">>;
	    /**
	     * Whether the current state value is a subset of the given parent state value.
	     * @param parentStateValue
	     */
	    matches<TSV extends TTypestate['value']>(parentStateValue: TSV): this is State<(TTypestate extends {
	        value: TSV;
	    } ? TTypestate : never)['context'], TEvent, TStateSchema, TTypestate> & {
	        value: TSV;
	    };
	}
	//# sourceMappingURL=State.d.ts.map
}
declare module 'Machine' {
	import { StateMachine, MachineOptions, DefaultContext, MachineConfig, StateSchema, EventObject, AnyEventObject, Typestate } from 'types';
	export function Machine<TContext = any, TEvent extends EventObject = AnyEventObject>(config: MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, initialContext?: TContext): StateMachine<TContext, any, TEvent>;
	export function Machine<TContext = DefaultContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = AnyEventObject>(config: MachineConfig<TContext, TStateSchema, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, initialContext?: TContext): StateMachine<TContext, TStateSchema, TEvent>;
	export function createMachine<TContext, TEvent extends EventObject = AnyEventObject, TTypestate extends Typestate<TContext> = {
	    value: any;
	    context: TContext;
	}>(config: MachineConfig<TContext, any, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>): StateMachine<TContext, any, TEvent, TTypestate>;
	//# sourceMappingURL=Machine.d.ts.map
}
declare module 'scheduler' {
	interface SchedulerOptions {
	    deferEvents: boolean;
	}
	export class Scheduler {
	    private processingEvent;
	    private queue;
	    private initialized;
	    private options;
	    constructor(options?: Partial<SchedulerOptions>);
	    initialize(callback?: () => void): void;
	    schedule(task: () => void): void;
	    clear(): void;
	    private flushEvents;
	    private process;
	}
	export {};
	//# sourceMappingURL=scheduler.d.ts.map
}
declare module 'registry' {
	import { Actor } from 'Actor';
	export interface Registry {
	    bookId(): string;
	    register(id: string, actor: Actor): string;
	    get(id: string): Actor | undefined;
	    free(id: string): void;
	}
	export const registry: Registry;
	//# sourceMappingURL=registry.d.ts.map
}
declare module 'devTools' {
	import { Interpreter } from '.'; type AnyInterpreter = Interpreter<any, any, any>;
	export function registerService(service: AnyInterpreter): void;
	export {};
	//# sourceMappingURL=devTools.d.ts.map
}
declare module 'interpreter' {
	import { StateMachine, Event, EventObject, DefaultContext, StateSchema, StateValue, InterpreterOptions, SingleOrArray, DoneEvent, Unsubscribable, MachineOptions, SCXML, EventData, Observer, Spawnable, Typestate } from 'types';
	import { State } from 'State';
	import { Actor } from 'Actor';
	export type StateListener<TContext, TEvent extends EventObject, TStateSchema extends StateSchema<TContext> = any, TTypestate extends Typestate<TContext> = any> = (state: State<TContext, TEvent, TStateSchema, TTypestate>, event: TEvent) => void;
	export type ContextListener<TContext = DefaultContext> = (context: TContext, prevContext: TContext | undefined) => void;
	export type EventListener<TEvent extends EventObject = EventObject> = (event: TEvent) => void;
	export type Listener = () => void;
	export interface Clock {
	    setTimeout(fn: (...args: any[]) => void, timeout: number): any;
	    clearTimeout(id: any): void;
	}
	interface SpawnOptions {
	    name?: string;
	    autoForward?: boolean;
	    sync?: boolean;
	}
	export class Interpreter<TContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = EventObject, TTypestate extends Typestate<TContext> = any> implements Actor<State<TContext, TEvent, TStateSchema, TTypestate>, TEvent> {
	    machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>;
	    /**
	     * The default interpreter options:
	     *
	     * - `clock` uses the global `setTimeout` and `clearTimeout` functions
	     * - `logger` uses the global `console.log()` method
	     */
	    static defaultOptions: InterpreterOptions;
	    /**
	     * The current state of the interpreted machine.
	     */
	    private _state?;
	    private _initialState?;
	    /**
	     * The clock that is responsible for setting and clearing timeouts, such as delayed events and transitions.
	     */
	    clock: Clock;
	    options: Readonly<InterpreterOptions>;
	    private scheduler;
	    private delayedEventsMap;
	    private listeners;
	    private contextListeners;
	    private stopListeners;
	    private doneListeners;
	    private eventListeners;
	    private sendListeners;
	    private logger;
	    /**
	     * Whether the service is started.
	     */
	    initialized: boolean;
	    private _status;
	    parent?: Interpreter<any>;
	    id: string;
	    /**
	     * The globally unique process ID for this invocation.
	     */
	    sessionId: string;
	    children: Map<string | number, Actor>;
	    private forwardTo;
	    private devTools?;
	    /**
	     * Creates a new Interpreter instance (i.e., service) for the given machine with the provided options, if any.
	     *
	     * @param machine The machine to be interpreted
	     * @param options Interpreter options
	     */
	    constructor(machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>, options?: Partial<InterpreterOptions>);
	    get initialState(): State<TContext, TEvent, TStateSchema, TTypestate>;
	    get state(): State<TContext, TEvent, TStateSchema, TTypestate>;
	    static interpret: typeof interpret;
	    /**
	     * Executes the actions of the given state, with that state's `context` and `event`.
	     *
	     * @param state The state whose actions will be executed
	     * @param actionsConfig The action implementations to use
	     */
	    execute(state: State<TContext, TEvent, TStateSchema, TTypestate>, actionsConfig?: MachineOptions<TContext, TEvent>['actions']): void;
	    private update;
	    onTransition(listener: StateListener<TContext, TEvent, TStateSchema, TTypestate>): this;
	    subscribe(observer: Observer<State<TContext, TEvent, any, TTypestate>>): Unsubscribable;
	    subscribe(nextListener?: (state: State<TContext, TEvent, any, TTypestate>) => void, errorListener?: (error: any) => void, completeListener?: () => void): Unsubscribable;
	    /**
	     * Adds an event listener that is notified whenever an event is sent to the running interpreter.
	     * @param listener The event listener
	     */
	    onEvent(listener: EventListener): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Adds an event listener that is notified whenever a `send` event occurs.
	     * @param listener The event listener
	     */
	    onSend(listener: EventListener): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Adds a context listener that is notified whenever the state context changes.
	     * @param listener The context listener
	     */
	    onChange(listener: ContextListener<TContext>): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Adds a listener that is notified when the machine is stopped.
	     * @param listener The listener
	     */
	    onStop(listener: Listener): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Adds a state listener that is notified when the statechart has reached its final state.
	     * @param listener The state listener
	     */
	    onDone(listener: EventListener<DoneEvent>): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Removes a listener.
	     * @param listener The listener to remove
	     */
	    off(listener: (...args: any[]) => void): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Alias for Interpreter.prototype.start
	     */
	    init: (initialState?: string | import("./types").StateValueMap | State<TContext, TEvent, TStateSchema, TTypestate> | undefined) => Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
	    /**
	     * Starts the interpreter from the given state, or the initial state.
	     * @param initialState The state to start the statechart from
	     */
	    start(initialState?: State<TContext, TEvent, TStateSchema, TTypestate> | StateValue): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
	    /**
	     * Stops the interpreter and unsubscribe all listeners.
	     *
	     * This will also notify the `onStop` listeners.
	     */
	    stop(): Interpreter<TContext, TStateSchema, TEvent>;
	    /**
	     * Sends an event to the running interpreter to trigger a transition.
	     *
	     * An array of events (batched) can be sent as well, which will send all
	     * batched events to the running interpreter. The listeners will be
	     * notified only **once** when all events are processed.
	     *
	     * @param event The event(s) to send
	     */
	    send: (event: SingleOrArray<Event<TEvent>> | SCXML.Event<TEvent>, payload?: EventData | undefined) => State<TContext, TEvent, TStateSchema, TTypestate>;
	    private batch;
	    /**
	     * Returns a send function bound to this interpreter instance.
	     *
	     * @param event The event to be sent by the sender.
	     */
	    sender(event: Event<TEvent>): () => State<TContext, TEvent, TStateSchema, TTypestate>;
	    private sendTo;
	    /**
	     * Returns the next state given the interpreter's current state and the event.
	     *
	     * This is a pure method that does _not_ update the interpreter's state.
	     *
	     * @param event The event to determine the next state
	     */
	    nextState(event: Event<TEvent> | SCXML.Event<TEvent>): State<TContext, TEvent, TStateSchema, TTypestate>;
	    private forward;
	    private defer;
	    private cancel;
	    private exec;
	    private removeChild;
	    private stopChild;
	    spawn(entity: Spawnable, name: string, options?: SpawnOptions): Actor;
	    spawnMachine<TChildContext, TChildStateSchema, TChildEvent extends EventObject>(machine: StateMachine<TChildContext, TChildStateSchema, TChildEvent>, options?: {
	        id?: string;
	        autoForward?: boolean;
	        sync?: boolean;
	    }): Interpreter<TChildContext, TChildStateSchema, TChildEvent>;
	    private spawnPromise;
	    private spawnCallback;
	    private spawnObservable;
	    private spawnActor;
	    private spawnActivity;
	    private spawnEffect;
	    private attachDev;
	    toJSON(): {
	        id: string;
	    };
	}
	export function spawn<TC, TE extends EventObject>(entity: StateMachine<TC, any, TE>, nameOrOptions?: string | SpawnOptions): Interpreter<TC, any, TE>;
	export function spawn(entity: Spawnable, nameOrOptions?: string | SpawnOptions): Actor;
	/**
	 * Creates a new Interpreter instance for the given machine with the provided options, if any.
	 *
	 * @param machine The machine to interpret
	 * @param options Interpreter options
	 */
	export function interpret<TContext = DefaultContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = EventObject, TTypestate extends Typestate<TContext> = any>(machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>, options?: Partial<InterpreterOptions>): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
	export {};
	//# sourceMappingURL=interpreter.d.ts.map
}
declare module 'match' {
	import { State } from 'State';
	import { StateValue, EventObject } from 'types';
	export type ValueFromStateGetter<T, TContext, TEvent extends EventObject> = (state: State<TContext, TEvent>) => T;
	export type StatePatternTuple<T, TContext, TEvent extends EventObject> = [StateValue, ValueFromStateGetter<T, TContext, TEvent>];
	export function matchState<T, TContext, TEvent extends EventObject>(state: State<TContext, TEvent> | StateValue, patterns: Array<StatePatternTuple<T, TContext, TEvent>>, defaultValue: ValueFromStateGetter<T, TContext, TEvent>): T;
	//# sourceMappingURL=match.d.ts.map
}
declare module 'index' {
	import { matchesState } from 'utils';
	import { mapState } from 'mapState';
	import { StateNode } from 'StateNode';
	import { State } from 'State';
	import { Machine, createMachine } from 'Machine';
	import { Actor } from 'Actor';
	import { raise, send, sendParent, sendUpdate, log, start, stop, assign, after, done, respond, doneInvoke, forwardTo, escalate, choose, pure } from 'actions';
	import { interpret, Interpreter, spawn } from 'interpreter';
	import { matchState } from 'match'; const actions: {
	    raise: typeof raise;
	    send: typeof send;
	    sendParent: typeof sendParent;
	    sendUpdate: typeof sendUpdate;
	    log: typeof log;
	    cancel: (sendId: string | number) => import("./types").CancelAction;
	    start: typeof start;
	    stop: typeof stop;
	    assign: <TContext, TEvent extends import("./types").EventObject = import("./types").EventObject>(assignment: import("./types").Assigner<TContext, TEvent> | import("./types").PropertyAssigner<TContext, TEvent>) => import("./types").AssignAction<TContext, TEvent>;
	    after: typeof after;
	    done: typeof done;
	    respond: typeof respond;
	    forwardTo: typeof forwardTo;
	    escalate: typeof escalate;
	    choose: typeof choose;
	    pure: typeof pure;
	};
	export { Actor, Machine, StateNode, State, matchesState, mapState, actions, assign, send, sendParent, sendUpdate, forwardTo, interpret, Interpreter, matchState, spawn, doneInvoke, createMachine };
	export * from 'types';
	//# sourceMappingURL=index.d.ts.map
}
declare module 'utils' {
	import { Event, StateValue, ActionType, Action, EventObject, PropertyMapper, Mapper, EventType, HistoryValue, AssignAction, Condition, Subscribable, StateMachine, ConditionPredicate, SCXML, StateLike, EventData, TransitionConfig, TransitionConfigTarget, NullEvent, SingleOrArray, Guard } from 'types';
	import { StateNode } from 'StateNode';
	import { State } from '.';
	import { Actor } from 'Actor';
	export function keys<T extends object>(value: T): Array<keyof T & string>;
	export function matchesState(parentStateId: StateValue, childStateId: StateValue, delimiter?: string): boolean;
	export function getEventType<TEvent extends EventObject = EventObject>(event: Event<TEvent>): TEvent['type'];
	export function getActionType(action: Action<any, any>): ActionType;
	export function toStatePath(stateId: string | string[], delimiter: string): string[];
	export function isStateLike(state: any): state is StateLike<any>;
	export function toStateValue(stateValue: StateLike<any> | StateValue | string[], delimiter: string): StateValue;
	export function pathToStateValue(statePath: string[]): StateValue;
	export function mapValues<T, P>(collection: {
	    [key: string]: T;
	}, iteratee: (item: T, key: string, collection: {
	    [key: string]: T;
	}, i: number) => P): {
	    [key: string]: P;
	};
	export function mapFilterValues<T, P>(collection: {
	    [key: string]: T;
	}, iteratee: (item: T, key: string, collection: {
	    [key: string]: T;
	}) => P, predicate: (item: T) => boolean): {
	    [key: string]: P;
	};
	/**
	 * Retrieves a value at the given path.
	 * @param props The deep path to the prop of the desired value
	 */
	export const path: <T extends Record<string, any>>(props: string[]) => any;
	/**
	 * Retrieves a value at the given path via the nested accessor prop.
	 * @param props The deep path to the prop of the desired value
	 */
	export function nestedPath<T extends Record<string, any>>(props: string[], accessorProp: keyof T): (object: T) => T;
	export function toStatePaths(stateValue: StateValue | undefined): string[][];
	export function pathsToStateValue(paths: string[][]): StateValue;
	export function flatten<T>(array: Array<T | T[]>): T[];
	export function toArrayStrict<T>(value: T[] | T): T[];
	export function toArray<T>(value: T[] | T | undefined): T[];
	export function mapContext<TContext, TEvent extends EventObject>(mapper: Mapper<TContext, TEvent, any> | PropertyMapper<TContext, TEvent, any>, context: TContext, _event: SCXML.Event<TEvent>): any;
	export function isBuiltInEvent(eventType: EventType): boolean;
	export function isPromiseLike(value: any): value is PromiseLike<any>;
	export function partition<T, A extends T, B extends T>(items: T[], predicate: (item: T) => item is A): [A[], B[]];
	export function updateHistoryStates(hist: HistoryValue, stateValue: StateValue): Record<string, HistoryValue | undefined>;
	export function updateHistoryValue(hist: HistoryValue, stateValue: StateValue): HistoryValue;
	export function updateContext<TContext, TEvent extends EventObject>(context: TContext, _event: SCXML.Event<TEvent>, assignActions: Array<AssignAction<TContext, TEvent>>, state?: State<TContext, TEvent>): TContext; let warn: (condition: boolean | Error, message: string) => void;
	export { warn };
	export function isArray(value: any): value is any[];
	export function isFunction(value: any): value is Function;
	export function isString(value: any): value is string;
	export function toGuard<TContext, TEvent extends EventObject>(condition?: Condition<TContext, TEvent>, guardMap?: Record<string, ConditionPredicate<TContext, TEvent>>): Guard<TContext, TEvent> | undefined;
	export function isObservable<T>(value: any): value is Subscribable<T>;
	export const symbolObservable: string | symbol;
	export function isMachine(value: any): value is StateMachine<any, any, any>;
	export function isActor(value: any): value is Actor;
	export const uniqueId: () => string;
	export function toEventObject<TEvent extends EventObject>(event: Event<TEvent>, payload?: EventData): TEvent;
	export function toSCXMLEvent<TEvent extends EventObject>(event: Event<TEvent> | SCXML.Event<TEvent>, scxmlEvent?: Partial<SCXML.Event<TEvent>>): SCXML.Event<TEvent>;
	export function toTransitionConfigArray<TContext, TEvent extends EventObject>(event: TEvent['type'] | NullEvent['type'] | '*', configLike: SingleOrArray<TransitionConfig<TContext, TEvent> | TransitionConfigTarget<TContext, TEvent>>): Array<TransitionConfig<TContext, TEvent> & {
	    event: TEvent['type'] | NullEvent['type'] | '*';
	}>;
	export function normalizeTarget<TContext, TEvent extends EventObject>(target: SingleOrArray<string | StateNode<TContext, any, TEvent>> | undefined): Array<string | StateNode<TContext, any, TEvent>> | undefined;
	export function reportUnhandledExceptionOnInvocation(originalError: any, currentError: any, id: string): void;
	export function evaluateGuard<TContext, TEvent extends EventObject>(machine: StateNode<TContext, any, TEvent>, guard: Guard<TContext, TEvent>, context: TContext, _event: SCXML.Event<TEvent>, state: State<TContext, TEvent>): boolean;
	//# sourceMappingURL=utils.d.ts.map
}
declare module 'StateNode' {
	import { Event, StateValue, StateValueMap, MachineOptions, EventObject, HistoryValue, StateNodeDefinition, TransitionDefinition, DelayedTransitionDefinition, ActivityDefinition, StateNodeConfig, StateSchema, StateNodesConfig, InvokeDefinition, ActionObject, Mapper, PropertyMapper, SCXML, Typestate, TransitionDefinitionMap } from 'types';
	import { State } from 'State'; class StateNode<TContext = any, TStateSchema extends StateSchema = any, TEvent extends EventObject = EventObject, TTypestate extends Typestate<TContext> = any> {
	    /**
	     * The raw config used to create the machine.
	     */
	    config: StateNodeConfig<TContext, TStateSchema, TEvent>;
	    /**
	     * The initial extended state
	     */
	    context?: Readonly<TContext> | undefined;
	    /**
	     * The relative key of the state node, which represents its location in the overall state value.
	     */
	    key: string;
	    /**
	     * The unique ID of the state node.
	     */
	    id: string;
	    /**
	     * The machine's own version.
	     */
	    version?: string;
	    /**
	     * The type of this state node:
	     *
	     *  - `'atomic'` - no child state nodes
	     *  - `'compound'` - nested child state nodes (XOR)
	     *  - `'parallel'` - orthogonal nested child state nodes (AND)
	     *  - `'history'` - history state node
	     *  - `'final'` - final state node
	     */
	    type: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
	    /**
	     * The string path from the root machine node to this node.
	     */
	    path: string[];
	    /**
	     * The initial state node key.
	     */
	    initial?: keyof TStateSchema['states'];
	    /**
	     * (DEPRECATED) Whether the state node is a parallel state node.
	     *
	     * Use `type: 'parallel'` instead.
	     */
	    parallel?: boolean;
	    /**
	     * Whether the state node is "transient". A state node is considered transient if it has
	     * an immediate transition from a "null event" (empty string), taken upon entering the state node.
	     */
	    private _transient;
	    /**
	     * The child state nodes.
	     */
	    states: StateNodesConfig<TContext, TStateSchema, TEvent>;
	    /**
	     * The type of history on this state node. Can be:
	     *
	     *  - `'shallow'` - recalls only top-level historical state value
	     *  - `'deep'` - recalls historical state value at all levels
	     */
	    history: false | 'shallow' | 'deep';
	    /**
	     * The action(s) to be executed upon entering the state node.
	     */
	    onEntry: Array<ActionObject<TContext, TEvent>>;
	    /**
	     * The action(s) to be executed upon exiting the state node.
	     */
	    onExit: Array<ActionObject<TContext, TEvent>>;
	    /**
	     * The activities to be started upon entering the state node,
	     * and stopped upon exiting the state node.
	     */
	    activities: Array<ActivityDefinition<TContext, TEvent>>;
	    strict: boolean;
	    /**
	     * The parent state node.
	     */
	    parent?: StateNode<TContext, any, TEvent>;
	    /**
	     * The root machine node.
	     */
	    machine: StateNode<TContext, any, TEvent>;
	    /**
	     * The meta data associated with this state node, which will be returned in State instances.
	     */
	    meta?: TStateSchema extends {
	        meta: infer D;
	    } ? D : any;
	    /**
	     * The data sent with the "done.state._id_" event if this is a final state node.
	     */
	    doneData?: Mapper<TContext, TEvent, any> | PropertyMapper<TContext, TEvent, any>;
	    /**
	     * The string delimiter for serializing the path to a string. The default is "."
	     */
	    delimiter: string;
	    /**
	     * The order this state node appears. Corresponds to the implicit SCXML document order.
	     */
	    order: number;
	    /**
	     * The services invoked by this state node.
	     */
	    invoke: Array<InvokeDefinition<TContext, TEvent>>;
	    options: MachineOptions<TContext, TEvent>;
	    __xstatenode: true;
	    private __cache;
	    private idMap;
	    constructor(
	    /**
	     * The raw config used to create the machine.
	     */
	    config: StateNodeConfig<TContext, TStateSchema, TEvent>, options?: Partial<MachineOptions<TContext, TEvent>>, 
	    /**
	     * The initial extended state
	     */
	    context?: Readonly<TContext> | undefined);
	    private _init;
	    /**
	     * Clones this state machine with custom options and context.
	     *
	     * @param options Options (actions, guards, activities, services) to recursively merge with the existing options.
	     * @param context Custom context (will override predefined context)
	     */
	    withConfig(options: Partial<MachineOptions<TContext, TEvent>>, context?: TContext | undefined): StateNode<TContext, TStateSchema, TEvent, TTypestate>;
	    /**
	     * Clones this state machine with custom context.
	     *
	     * @param context Custom context (will override predefined context, not recursive)
	     */
	    withContext(context: TContext): StateNode<TContext, TStateSchema, TEvent>;
	    /**
	     * The well-structured state node definition.
	     */
	    get definition(): StateNodeDefinition<TContext, TStateSchema, TEvent>;
	    toJSON(): StateNodeDefinition<TContext, TStateSchema, TEvent>;
	    /**
	     * The mapping of events to transitions.
	     */
	    get on(): TransitionDefinitionMap<TContext, TEvent>;
	    get after(): Array<DelayedTransitionDefinition<TContext, TEvent>>;
	    /**
	     * All the transitions that can be taken from this state node.
	     */
	    get transitions(): Array<TransitionDefinition<TContext, TEvent>>;
	    private getCandidates;
	    /**
	     * All delayed transitions from the config.
	     */
	    private getDelayedTransitions;
	    /**
	     * Returns the state nodes represented by the current state value.
	     *
	     * @param state The state value or State instance
	     */
	    getStateNodes(state: StateValue | State<TContext, TEvent>): Array<StateNode<TContext, any, TEvent>>;
	    /**
	     * Returns `true` if this state node explicitly handles the given event.
	     *
	     * @param event The event in question
	     */
	    handles(event: Event<TEvent>): boolean;
	    /**
	     * Resolves the given `state` to a new `State` instance relative to this machine.
	     *
	     * This ensures that `.events` and `.nextEvents` represent the correct values.
	     *
	     * @param state The state to resolve
	     */
	    resolveState(state: State<TContext, TEvent>): State<TContext, TEvent>;
	    private transitionLeafNode;
	    private transitionCompoundNode;
	    private transitionParallelNode;
	    private _transition;
	    private next;
	    private nodesFromChild;
	    /**
	     * Whether the given state node "escapes" this state node. If the `stateNode` is equal to or the parent of
	     * this state node, it does not escape.
	     */
	    private escapes;
	    private getActions;
	    /**
	     * Determines the next state given the current `state` and sent `event`.
	     *
	     * @param state The current State instance or state value
	     * @param event The event that was sent at the current state
	     * @param context The current context (extended state) of the current state
	     */
	    transition(state: string | StateValueMap | State<TContext, TEvent, any, {
	        value: any;
	        context: TContext;
	    }> | undefined, event: Event<TEvent> | SCXML.Event<TEvent>, context?: TContext): State<TContext, TEvent, TStateSchema, TTypestate>;
	    private resolveRaisedTransition;
	    private resolveTransition;
	    /**
	     * Returns the child state node from its relative `stateKey`, or throws.
	     */
	    getStateNode(stateKey: string): StateNode<TContext, any, TEvent>;
	    /**
	     * Returns the state node with the given `stateId`, or throws.
	     *
	     * @param stateId The state ID. The prefix "#" is removed.
	     */
	    getStateNodeById(stateId: string): StateNode<TContext, any, TEvent>;
	    /**
	     * Returns the relative state node from the given `statePath`, or throws.
	     *
	     * @param statePath The string or string array relative path to the state node.
	     */
	    getStateNodeByPath(statePath: string | string[]): StateNode<TContext, any, TEvent>;
	    /**
	     * Resolves a partial state value with its full representation in this machine.
	     *
	     * @param stateValue The partial state value to resolve.
	     */
	    resolve(stateValue: StateValue): StateValue;
	    private getResolvedPath;
	    private get initialStateValue();
	    getInitialState(stateValue: StateValue, context?: TContext): State<TContext, TEvent, TStateSchema, TTypestate>;
	    /**
	     * The initial State instance, which includes all actions to be executed from
	     * entering the initial state.
	     */
	    get initialState(): State<TContext, TEvent, TStateSchema, TTypestate>;
	    /**
	     * The target state value of the history state node, if it exists. This represents the
	     * default state value to transition to if no history value exists yet.
	     */
	    get target(): StateValue | undefined;
	    /**
	     * Returns the leaf nodes from a state path relative to this state node.
	     *
	     * @param relativeStateId The relative state path to retrieve the state nodes
	     * @param history The previous state to retrieve history
	     * @param resolve Whether state nodes should resolve to initial child state nodes
	     */
	    getRelativeStateNodes(relativeStateId: StateNode<TContext, any, TEvent>, historyValue?: HistoryValue, resolve?: boolean): Array<StateNode<TContext, any, TEvent>>;
	    get initialStateNodes(): Array<StateNode<TContext, any, TEvent>>;
	    /**
	     * Retrieves state nodes from a relative path to this state node.
	     *
	     * @param relativePath The relative path from this state node
	     * @param historyValue
	     */
	    getFromRelativePath(relativePath: string[]): Array<StateNode<TContext, any, TEvent>>;
	    private historyValue;
	    /**
	     * Resolves to the historical value(s) of the parent state node,
	     * represented by state nodes.
	     *
	     * @param historyValue
	     */
	    private resolveHistory;
	    /**
	     * All the state node IDs of this state node and its descendant state nodes.
	     */
	    get stateIds(): string[];
	    /**
	     * All the event types accepted by this state node and its descendants.
	     */
	    get events(): Array<TEvent['type']>;
	    /**
	     * All the events that have transitions directly from this state node.
	     *
	     * Excludes any inert events.
	     */
	    get ownEvents(): Array<TEvent['type']>;
	    private resolveTarget;
	    private formatTransition;
	    private formatTransitions;
	}
	export { StateNode };
	//# sourceMappingURL=StateNode.d.ts.map
}
declare module 'types' {
	import { StateNode } from 'StateNode';
	import { State } from 'State';
	import { Interpreter, Clock } from 'interpreter';
	import { Actor } from 'Actor';
	export type EventType = string;
	export type ActionType = string;
	export type MetaObject = Record<string, any>;
	/**
	 * The full definition of an event, with a string `type`.
	 */
	export interface EventObject {
	    /**
	     * The type of event that is sent.
	     */
	    type: string;
	}
	export interface AnyEventObject extends EventObject {
	    [key: string]: any;
	}
	/**
	 * The full definition of an action, with a string `type` and an
	 * `exec` implementation function.
	 */
	export interface ActionObject<TContext, TEvent extends EventObject> {
	    /**
	     * The type of action that is executed.
	     */
	    type: string;
	    /**
	     * The implementation for executing the action.
	     */
	    exec?: ActionFunction<TContext, TEvent>;
	    [other: string]: any;
	}
	export type DefaultContext = Record<string, any> | undefined;
	export type EventData = Record<string, any> & {
	    type?: never;
	};
	/**
	 * The specified string event types or the specified event objects.
	 */
	export type Event<TEvent extends EventObject> = TEvent['type'] | TEvent;
	export interface ActionMeta<TContext, TEvent extends EventObject> extends StateMeta<TContext, TEvent> {
	    action: ActionObject<TContext, TEvent>;
	    _event: SCXML.Event<TEvent>;
	}
	export interface AssignMeta<TContext, TEvent extends EventObject> {
	    state?: State<TContext, TEvent>;
	    action: AssignAction<TContext, TEvent>;
	    _event: SCXML.Event<TEvent>;
	}
	export type ActionFunction<TContext, TEvent extends EventObject> = (context: TContext, event: TEvent, meta: ActionMeta<TContext, TEvent>) => void;
	export interface ChooseConditon<TContext, TEvent extends EventObject> {
	    cond?: Condition<TContext, TEvent>;
	    actions: Actions<TContext, TEvent>;
	}
	export type Action<TContext, TEvent extends EventObject> = ActionType | ActionObject<TContext, TEvent> | ActionFunction<TContext, TEvent> | AssignAction<Required<TContext>, TEvent> | SendAction<TContext, TEvent, AnyEventObject> | RaiseAction<AnyEventObject> | ChooseAction<TContext, TEvent>;
	export type Actions<TContext, TEvent extends EventObject> = SingleOrArray<Action<TContext, TEvent>>;
	export type StateKey = string | State<any>;
	export interface StateValueMap {
	    [key: string]: StateValue;
	}
	/**
	 * The string or object representing the state value relative to the parent state node.
	 *
	 * - For a child atomic state node, this is a string, e.g., `"pending"`.
	 * - For complex state nodes, this is an object, e.g., `{ success: "someChildState" }`.
	 */
	export type StateValue = string | StateValueMap;
	export type ExtractStateValue<TS extends StateSchema<any>, TSS = TS['states']> = TSS extends undefined ? never : {
	    [K in keyof TSS]?: (TSS[K] extends {
	        states: any;
	    } ? keyof TSS[K]['states'] : never) | ExtractStateValue<TSS[K]>;
	};
	export interface HistoryValue {
	    states: Record<string, HistoryValue | undefined>;
	    current: StateValue | undefined;
	}
	export type ConditionPredicate<TContext, TEvent extends EventObject> = (context: TContext, event: TEvent, meta: GuardMeta<TContext, TEvent>) => boolean;
	export type DefaultGuardType = 'xstate.guard';
	export interface GuardPredicate<TContext, TEvent extends EventObject> {
	    type: DefaultGuardType;
	    name: string | undefined;
	    predicate: ConditionPredicate<TContext, TEvent>;
	}
	export type Guard<TContext, TEvent extends EventObject> = GuardPredicate<TContext, TEvent> | (Record<string, any> & {
	    type: string;
	});
	export interface GuardMeta<TContext, TEvent extends EventObject> extends StateMeta<TContext, TEvent> {
	    cond: Guard<TContext, TEvent>;
	}
	export type Condition<TContext, TEvent extends EventObject> = string | ConditionPredicate<TContext, TEvent> | Guard<TContext, TEvent>;
	export type TransitionTarget<TContext, TEvent extends EventObject> = SingleOrArray<string | StateNode<TContext, any, TEvent>>;
	export type TransitionTargets<TContext> = Array<string | StateNode<TContext, any>>;
	export interface TransitionConfig<TContext, TEvent extends EventObject> {
	    cond?: Condition<TContext, TEvent>;
	    actions?: Actions<TContext, TEvent>;
	    in?: StateValue;
	    internal?: boolean;
	    target?: TransitionTarget<TContext, TEvent>;
	    meta?: Record<string, any>;
	}
	export interface TargetTransitionConfig<TContext, TEvent extends EventObject> extends TransitionConfig<TContext, TEvent> {
	    target: TransitionTarget<TContext, TEvent>;
	}
	export type ConditionalTransitionConfig<TContext, TEvent extends EventObject = EventObject> = Array<TransitionConfig<TContext, TEvent>>;
	export type Transition<TContext, TEvent extends EventObject = EventObject> = string | TransitionConfig<TContext, TEvent> | ConditionalTransitionConfig<TContext, TEvent>;
	export type DisposeActivityFunction = () => void;
	export type ActivityConfig<TContext, TEvent extends EventObject> = (ctx: TContext, activity: ActivityDefinition<TContext, TEvent>) => DisposeActivityFunction | void;
	export type Activity<TContext, TEvent extends EventObject> = string | ActivityDefinition<TContext, TEvent>;
	export interface ActivityDefinition<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    id: string;
	    type: string;
	}
	export type Sender<TEvent extends EventObject> = (event: Event<TEvent>) => void;
	export type Receiver<TEvent extends EventObject> = (listener: (event: TEvent) => void) => void;
	export type InvokeCallback = (callback: Sender<any>, onReceive: Receiver<EventObject>) => any;
	export interface InvokeMeta {
	    data: any;
	}
	/**
	 * Returns either a Promises or a callback handler (for streams of events) given the
	 * machine's current `context` and `event` that invoked the service.
	 *
	 * For Promises, the only events emitted to the parent will be:
	 * - `done.invoke.<id>` with the `data` containing the resolved payload when the promise resolves, or:
	 * - `error.platform.<id>` with the `data` containing the caught error, and `src` containing the service `id`.
	 *
	 * For callback handlers, the `callback` will be provided, which will send events to the parent service.
	 *
	 * @param context The current machine `context`
	 * @param event The event that invoked the service
	 */
	export type InvokeCreator<TContext, TEvent = AnyEventObject, TFinalContext = any> = (context: TContext, event: TEvent, meta: InvokeMeta) => PromiseLike<TFinalContext> | StateMachine<TFinalContext, any, any> | Subscribable<any> | InvokeCallback;
	export interface InvokeDefinition<TContext, TEvent extends EventObject> extends ActivityDefinition<TContext, TEvent> {
	    /**
	     * The source of the machine to be invoked, or the machine itself.
	     */
	    src: string;
	    /**
	     * If `true`, events sent to the parent service will be forwarded to the invoked service.
	     *
	     * Default: `false`
	     */
	    autoForward?: boolean;
	    /**
	     * @deprecated
	     *
	     *  Use `autoForward` property instead of `forward`. Support for `forward` will get removed in the future.
	     */
	    forward?: boolean;
	    /**
	     * Data from the parent machine's context to set as the (partial or full) context
	     * for the invoked child machine.
	     *
	     * Data should be mapped to match the child machine's context shape.
	     */
	    data?: Mapper<TContext, TEvent, any> | PropertyMapper<TContext, TEvent, any>;
	}
	export interface Delay {
	    id: string;
	    /**
	     * The time to delay the event, in milliseconds.
	     */
	    delay: number;
	}
	export type DelayedTransitions<TContext, TEvent extends EventObject> = Record<string | number, string | SingleOrArray<TransitionConfig<TContext, TEvent>>> | Array<TransitionConfig<TContext, TEvent> & {
	    delay: number | string | Expr<TContext, TEvent, number>;
	}>;
	export type StateTypes = 'atomic' | 'compound' | 'parallel' | 'final' | 'history' | string;
	export type SingleOrArray<T> = T[] | T;
	export type StateNodesConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> = {
	    [K in keyof TStateSchema['states']]: StateNode<TContext, TStateSchema['states'][K], TEvent>;
	};
	export type StatesConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> = {
	    [K in keyof TStateSchema['states']]: StateNodeConfig<TContext, TStateSchema['states'][K], TEvent>;
	};
	export type StatesDefinition<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> = {
	    [K in keyof TStateSchema['states']]: StateNodeDefinition<TContext, TStateSchema['states'][K], TEvent>;
	};
	export type TransitionConfigTarget<TContext, TEvent extends EventObject> = string | undefined | StateNode<TContext, any, TEvent>;
	export type TransitionConfigOrTarget<TContext, TEvent extends EventObject> = SingleOrArray<TransitionConfigTarget<TContext, TEvent> | TransitionConfig<TContext, TEvent>>; type TransitionsConfigMap<TContext, TEvent extends EventObject> = {
	    [K in TEvent['type']]?: TransitionConfigOrTarget<TContext, TEvent extends {
	        type: K;
	    } ? TEvent : never>;
	} & {
	    ''?: TransitionConfigOrTarget<TContext, TEvent>;
	} & {
	    '*'?: TransitionConfigOrTarget<TContext, TEvent>;
	}; type TransitionsConfigArray<TContext, TEvent extends EventObject> = Array<{
	    [K in TEvent['type']]: TransitionConfig<TContext, TEvent extends {
	        type: K;
	    } ? TEvent : never> & {
	        event: K;
	    };
	}[TEvent['type']] | (TransitionConfig<TContext, TEvent> & {
	    event: '';
	}) | (TransitionConfig<TContext, TEvent> & {
	    event: '*';
	})>;
	export type TransitionsConfig<TContext, TEvent extends EventObject> = TransitionsConfigMap<TContext, TEvent> | TransitionsConfigArray<TContext, TEvent>;
	export type InvokeConfig<TContext, TEvent extends EventObject> = {
	    /**
	     * The unique identifier for the invoked machine. If not specified, this
	     * will be the machine's own `id`, or the URL (from `src`).
	     */
	    id?: string;
	    /**
	     * The source of the machine to be invoked, or the machine itself.
	     */
	    src: string | StateMachine<any, any, any> | InvokeCreator<TContext, TEvent, any>;
	    /**
	     * If `true`, events sent to the parent service will be forwarded to the invoked service.
	     *
	     * Default: `false`
	     */
	    autoForward?: boolean;
	    /**
	     * @deprecated
	     *
	     *  Use `autoForward` property instead of `forward`. Support for `forward` will get removed in the future.
	     */
	    forward?: boolean;
	    /**
	     * Data from the parent machine's context to set as the (partial or full) context
	     * for the invoked child machine.
	     *
	     * Data should be mapped to match the child machine's context shape.
	     */
	    data?: Mapper<TContext, TEvent, any> | PropertyMapper<TContext, TEvent, any>;
	    /**
	     * The transition to take upon the invoked child machine reaching its final top-level state.
	     */
	    onDone?: string | SingleOrArray<TransitionConfig<TContext, DoneInvokeEvent<any>>>;
	    /**
	     * The transition to take upon the invoked child machine sending an error event.
	     */
	    onError?: string | SingleOrArray<TransitionConfig<TContext, DoneInvokeEvent<any>>>;
	};
	export interface StateNodeConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> {
	    /**
	     * The relative key of the state node, which represents its location in the overall state value.
	     * This is automatically determined by the configuration shape via the key where it was defined.
	     */
	    key?: string;
	    /**
	     * The initial state node key.
	     */
	    initial?: keyof TStateSchema['states'] | undefined;
	    /**
	     * @deprecated
	     */
	    parallel?: boolean | undefined;
	    /**
	     * The type of this state node:
	     *
	     *  - `'atomic'` - no child state nodes
	     *  - `'compound'` - nested child state nodes (XOR)
	     *  - `'parallel'` - orthogonal nested child state nodes (AND)
	     *  - `'history'` - history state node
	     *  - `'final'` - final state node
	     */
	    type?: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
	    /**
	     * The initial context (extended state) of the machine.
	     *
	     * Can be an object or a function that returns an object.
	     */
	    context?: TContext | (() => TContext);
	    /**
	     * Indicates whether the state node is a history state node, and what
	     * type of history:
	     * shallow, deep, true (shallow), false (none), undefined (none)
	     */
	    history?: 'shallow' | 'deep' | boolean | undefined;
	    /**
	     * The mapping of state node keys to their state node configurations (recursive).
	     */
	    states?: StatesConfig<TContext, TStateSchema, TEvent> | undefined;
	    /**
	     * The services to invoke upon entering this state node. These services will be stopped upon exiting this state node.
	     */
	    invoke?: SingleOrArray<InvokeConfig<TContext, TEvent> | StateMachine<any, any, any>>;
	    /**
	     * The mapping of event types to their potential transition(s).
	     */
	    on?: TransitionsConfig<TContext, TEvent>;
	    /**
	     * The action(s) to be executed upon entering the state node.
	     *
	     * @deprecated Use `entry` instead.
	     */
	    onEntry?: Actions<TContext, TEvent>;
	    /**
	     * The action(s) to be executed upon entering the state node.
	     */
	    entry?: Actions<TContext, TEvent>;
	    /**
	     * The action(s) to be executed upon exiting the state node.
	     *
	     * @deprecated Use `exit` instead.
	     */
	    onExit?: Actions<TContext, TEvent>;
	    /**
	     * The action(s) to be executed upon exiting the state node.
	     */
	    exit?: Actions<TContext, TEvent>;
	    /**
	     * The potential transition(s) to be taken upon reaching a final child state node.
	     *
	     * This is equivalent to defining a `[done(id)]` transition on this state node's `on` property.
	     */
	    onDone?: string | SingleOrArray<TransitionConfig<TContext, DoneEventObject>>;
	    /**
	     * The mapping (or array) of delays (in milliseconds) to their potential transition(s).
	     * The delayed transitions are taken after the specified delay in an interpreter.
	     */
	    after?: DelayedTransitions<TContext, TEvent>;
	    /**
	     * An eventless transition that is always taken when this state node is active.
	     * Equivalent to a transition specified as an empty `''`' string in the `on` property.
	     */
	    always?: TransitionConfigOrTarget<TContext, TEvent>;
	    /**
	     * The activities to be started upon entering the state node,
	     * and stopped upon exiting the state node.
	     */
	    activities?: SingleOrArray<Activity<TContext, TEvent>>;
	    /**
	     * @private
	     */
	    parent?: StateNode<TContext, any, TEvent>;
	    strict?: boolean | undefined;
	    /**
	     * The meta data associated with this state node, which will be returned in State instances.
	     */
	    meta?: TStateSchema extends {
	        meta: infer D;
	    } ? D : any;
	    /**
	     * The data sent with the "done.state._id_" event if this is a final state node.
	     *
	     * The data will be evaluated with the current `context` and placed on the `.data` property
	     * of the event.
	     */
	    data?: Mapper<TContext, TEvent, any> | PropertyMapper<TContext, TEvent, any>;
	    /**
	     * The unique ID of the state node, which can be referenced as a transition target via the
	     * `#id` syntax.
	     */
	    id?: string | undefined;
	    /**
	     * The string delimiter for serializing the path to a string. The default is "."
	     */
	    delimiter?: string;
	    /**
	     * The order this state node appears. Corresponds to the implicit SCXML document order.
	     */
	    order?: number;
	}
	export interface StateNodeDefinition<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> {
	    id: string;
	    version: string | undefined;
	    key: string;
	    context: TContext;
	    type: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
	    initial: StateNodeConfig<TContext, TStateSchema, TEvent>['initial'];
	    history: boolean | 'shallow' | 'deep' | undefined;
	    states: StatesDefinition<TContext, TStateSchema, TEvent>;
	    on: TransitionDefinitionMap<TContext, TEvent>;
	    transitions: Array<TransitionDefinition<TContext, TEvent>>;
	    entry: Array<ActionObject<TContext, TEvent>>;
	    exit: Array<ActionObject<TContext, TEvent>>;
	    activities: Array<ActivityDefinition<TContext, TEvent>>;
	    meta: any;
	    order: number;
	    data?: FinalStateNodeConfig<TContext, TEvent>['data'];
	    invoke: Array<InvokeDefinition<TContext, TEvent>>;
	}
	export type AnyStateNodeDefinition = StateNodeDefinition<any, any, any>;
	export interface AtomicStateNodeConfig<TContext, TEvent extends EventObject> extends StateNodeConfig<TContext, StateSchema, TEvent> {
	    initial?: undefined;
	    parallel?: false | undefined;
	    states?: undefined;
	    onDone?: undefined;
	}
	export interface HistoryStateNodeConfig<TContext, TEvent extends EventObject> extends AtomicStateNodeConfig<TContext, TEvent> {
	    history: 'shallow' | 'deep' | true;
	    target: StateValue | undefined;
	}
	export interface FinalStateNodeConfig<TContext, TEvent extends EventObject> extends AtomicStateNodeConfig<TContext, TEvent> {
	    type: 'final';
	    /**
	     * The data to be sent with the "done.state.<id>" event. The data can be
	     * static or dynamic (based on assigners).
	     */
	    data?: Mapper<TContext, TEvent, any> | PropertyMapper<TContext, TEvent, any>;
	}
	export type SimpleOrStateNodeConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> = AtomicStateNodeConfig<TContext, TEvent> | StateNodeConfig<TContext, TStateSchema, TEvent>;
	export type ActionFunctionMap<TContext, TEvent extends EventObject> = Record<string, ActionObject<TContext, TEvent> | ActionFunction<TContext, TEvent>>;
	export type DelayFunctionMap<TContext, TEvent extends EventObject> = Record<string, DelayConfig<TContext, TEvent>>;
	export type ServiceConfig<TContext> = string | StateMachine<any, any, any> | InvokeCreator<TContext>;
	export type DelayConfig<TContext, TEvent extends EventObject> = number | DelayExpr<TContext, TEvent>;
	export interface MachineOptions<TContext, TEvent extends EventObject> {
	    guards: Record<string, ConditionPredicate<TContext, TEvent>>;
	    actions: ActionFunctionMap<TContext, TEvent>;
	    activities: Record<string, ActivityConfig<TContext, TEvent>>;
	    services: Record<string, ServiceConfig<TContext>>;
	    delays: DelayFunctionMap<TContext, TEvent>;
	    /**
	     * @private
	     */
	    _parent?: StateNode<TContext, any, TEvent>;
	    /**
	     * @private
	     */
	    _key?: string;
	}
	export interface MachineConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> extends StateNodeConfig<TContext, TStateSchema, TEvent> {
	    /**
	     * The initial context (extended state)
	     */
	    context?: TContext | (() => TContext);
	    /**
	     * The machine's own version.
	     */
	    version?: string;
	}
	export interface StandardMachineConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> extends StateNodeConfig<TContext, TStateSchema, TEvent> {
	}
	export interface ParallelMachineConfig<TContext, TStateSchema extends StateSchema, TEvent extends EventObject> extends StateNodeConfig<TContext, TStateSchema, TEvent> {
	    initial?: undefined;
	    type?: 'parallel';
	}
	export interface EntryExitEffectMap<TContext, TEvent extends EventObject> {
	    entry: Array<ActionObject<TContext, TEvent>>;
	    exit: Array<ActionObject<TContext, TEvent>>;
	}
	export interface HistoryStateNode<TContext> extends StateNode<TContext> {
	    history: 'shallow' | 'deep';
	    target: StateValue | undefined;
	}
	export interface StateMachine<TContext, TStateSchema extends StateSchema, TEvent extends EventObject, TTypestate extends Typestate<TContext> = any> extends StateNode<TContext, TStateSchema, TEvent, TTypestate> {
	    id: string;
	    states: StateNode<TContext, TStateSchema, TEvent>['states'];
	}
	export type StateFrom<TMachine extends StateMachine<any, any, any>> = ReturnType<TMachine['transition']>;
	export interface ActionMap<TContext, TEvent extends EventObject> {
	    onEntry: Array<Action<TContext, TEvent>>;
	    actions: Array<Action<TContext, TEvent>>;
	    onExit: Array<Action<TContext, TEvent>>;
	}
	export interface EntryExitStates<TContext> {
	    entry: Set<StateNode<TContext>>;
	    exit: Set<StateNode<TContext>>;
	}
	export interface EntryExitStateArrays<TContext> {
	    entry: Array<StateNode<TContext>>;
	    exit: Array<StateNode<TContext>>;
	}
	export interface ActivityMap {
	    [activityKey: string]: ActivityDefinition<any, any> | false;
	}
	export interface StateTransition<TContext, TEvent extends EventObject> {
	    transitions: Array<TransitionDefinition<TContext, TEvent>>;
	    configuration: Array<StateNode<TContext, any, TEvent>>;
	    entrySet: Array<StateNode<TContext, any, TEvent>>;
	    exitSet: Array<StateNode<TContext, any, TEvent>>;
	    /**
	     * The source state that preceded the transition.
	     */
	    source: State<TContext> | undefined;
	    actions: Array<ActionObject<TContext, TEvent>>;
	}
	export interface TransitionData<TContext, TEvent extends EventObject> {
	    value: StateValue | undefined;
	    actions: ActionMap<TContext, TEvent>;
	    activities?: ActivityMap;
	}
	export enum ActionTypes {
	    Start = "xstate.start",
	    Stop = "xstate.stop",
	    Raise = "xstate.raise",
	    Send = "xstate.send",
	    Cancel = "xstate.cancel",
	    NullEvent = "",
	    Assign = "xstate.assign",
	    After = "xstate.after",
	    DoneState = "done.state",
	    DoneInvoke = "done.invoke",
	    Log = "xstate.log",
	    Init = "xstate.init",
	    Invoke = "xstate.invoke",
	    ErrorExecution = "error.execution",
	    ErrorCommunication = "error.communication",
	    ErrorPlatform = "error.platform",
	    ErrorCustom = "xstate.error",
	    Update = "xstate.update",
	    Pure = "xstate.pure",
	    Choose = "xstate.choose"
	}
	export interface RaiseAction<TEvent extends EventObject> {
	    type: ActionTypes.Raise;
	    event: TEvent['type'];
	}
	export interface RaiseActionObject<TEvent extends EventObject> {
	    type: ActionTypes.Raise;
	    _event: SCXML.Event<TEvent>;
	}
	export interface DoneInvokeEvent<TData> extends EventObject {
	    data: TData;
	}
	export interface ErrorExecutionEvent extends EventObject {
	    src: string;
	    type: ActionTypes.ErrorExecution;
	    data: any;
	}
	export interface ErrorPlatformEvent extends EventObject {
	    data: any;
	}
	export interface DoneEventObject extends EventObject {
	    data?: any;
	    toString(): string;
	}
	export interface UpdateObject extends EventObject {
	    id: string | number;
	    state: State<any, any>;
	}
	export type DoneEvent = DoneEventObject & string;
	export interface NullEvent {
	    type: ActionTypes.NullEvent;
	}
	export interface ActivityActionObject<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    type: ActionTypes.Start | ActionTypes.Stop;
	    activity: ActivityDefinition<TContext, TEvent>;
	    exec: ActionFunction<TContext, TEvent> | undefined;
	}
	export interface InvokeActionObject<TContext, TEvent extends EventObject> extends ActivityActionObject<TContext, TEvent> {
	    activity: InvokeDefinition<TContext, TEvent>;
	}
	export type DelayExpr<TContext, TEvent extends EventObject> = ExprWithMeta<TContext, TEvent, number>;
	export type LogExpr<TContext, TEvent extends EventObject> = ExprWithMeta<TContext, TEvent, any>;
	export interface LogAction<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    label: string | undefined;
	    expr: string | LogExpr<TContext, TEvent>;
	}
	export interface LogActionObject<TContext, TEvent extends EventObject> extends LogAction<TContext, TEvent> {
	    value: any;
	}
	export interface SendAction<TContext, TEvent extends EventObject, TSentEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    to: string | number | Actor | ExprWithMeta<TContext, TEvent, string | number | Actor> | undefined;
	    event: TSentEvent | SendExpr<TContext, TEvent, TSentEvent>;
	    delay?: number | string | DelayExpr<TContext, TEvent>;
	    id: string | number;
	}
	export interface SendActionObject<TContext, TEvent extends EventObject, TSentEvent extends EventObject = AnyEventObject> extends SendAction<TContext, TEvent, TSentEvent> {
	    to: string | number | Actor | undefined;
	    _event: SCXML.Event<TSentEvent>;
	    event: TSentEvent;
	    delay?: number;
	    id: string | number;
	}
	export type Expr<TContext, TEvent extends EventObject, T> = (context: TContext, event: TEvent) => T;
	export type ExprWithMeta<TContext, TEvent extends EventObject, T> = (context: TContext, event: TEvent, meta: SCXMLEventMeta<TEvent>) => T;
	export type SendExpr<TContext, TEvent extends EventObject, TSentEvent extends EventObject = AnyEventObject> = ExprWithMeta<TContext, TEvent, TSentEvent>;
	export enum SpecialTargets {
	    Parent = "#_parent",
	    Internal = "#_internal"
	}
	export interface SendActionOptions<TContext, TEvent extends EventObject> {
	    id?: string | number;
	    delay?: number | string | DelayExpr<TContext, TEvent>;
	    to?: string | ExprWithMeta<TContext, TEvent, string | number | Actor>;
	}
	export interface CancelAction extends ActionObject<any, any> {
	    sendId: string | number;
	}
	export type Assigner<TContext, TEvent extends EventObject> = (context: TContext, event: TEvent, meta: AssignMeta<TContext, TEvent>) => Partial<TContext>;
	export type PropertyAssigner<TContext, TEvent extends EventObject> = {
	    [K in keyof TContext]?: ((context: TContext, event: TEvent, meta: AssignMeta<TContext, TEvent>) => TContext[K]) | TContext[K];
	};
	export type Mapper<TContext, TEvent extends EventObject, TParams extends {}> = (context: TContext, event: TEvent) => TParams;
	export type PropertyMapper<TContext, TEvent extends EventObject, TParams extends {}> = {
	    [K in keyof TParams]?: ((context: TContext, event: TEvent) => TParams[K]) | TParams[K];
	};
	export interface AnyAssignAction<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    type: ActionTypes.Assign;
	    assignment: any;
	}
	export interface AssignAction<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    type: ActionTypes.Assign;
	    assignment: Assigner<TContext, TEvent> | PropertyAssigner<TContext, TEvent>;
	}
	export interface PureAction<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    type: ActionTypes.Pure;
	    get: (context: TContext, event: TEvent) => SingleOrArray<ActionObject<TContext, TEvent>> | undefined;
	}
	export interface ChooseAction<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
	    type: ActionTypes.Choose;
	    conds: Array<ChooseConditon<TContext, TEvent>>;
	}
	export interface TransitionDefinition<TContext, TEvent extends EventObject> extends TransitionConfig<TContext, TEvent> {
	    target: Array<StateNode<TContext, any, TEvent>> | undefined;
	    source: StateNode<TContext, any, TEvent>;
	    actions: Array<ActionObject<TContext, TEvent>>;
	    cond?: Guard<TContext, TEvent>;
	    eventType: TEvent['type'] | NullEvent['type'] | '*';
	    toJSON: () => {
	        target: string[] | undefined;
	        source: string;
	        actions: Array<ActionObject<TContext, TEvent>>;
	        cond?: Guard<TContext, TEvent>;
	        eventType: TEvent['type'] | NullEvent['type'] | '*';
	    };
	}
	export type TransitionDefinitionMap<TContext, TEvent extends EventObject> = {
	    [K in TEvent['type'] | NullEvent['type'] | '*']: Array<TransitionDefinition<TContext, K extends TEvent['type'] ? Extract<TEvent, {
	        type: K;
	    }> : EventObject>>;
	};
	export interface DelayedTransitionDefinition<TContext, TEvent extends EventObject> extends TransitionDefinition<TContext, TEvent> {
	    delay: number | string | DelayExpr<TContext, TEvent>;
	}
	export interface Edge<TContext, TEvent extends EventObject, TEventType extends TEvent['type'] = string> {
	    event: TEventType;
	    source: StateNode<TContext, any, TEvent>;
	    target: StateNode<TContext, any, TEvent>;
	    cond?: Condition<TContext, TEvent & {
	        type: TEventType;
	    }>;
	    actions: Array<Action<TContext, TEvent>>;
	    meta?: MetaObject;
	    transition: TransitionDefinition<TContext, TEvent>;
	}
	export interface NodesAndEdges<TContext, TEvent extends EventObject> {
	    nodes: StateNode[];
	    edges: Array<Edge<TContext, TEvent, TEvent['type']>>;
	}
	export interface Segment<TContext, TEvent extends EventObject> {
	    /**
	     * From state.
	     */
	    state: State<TContext, TEvent>;
	    /**
	     * Event from state.
	     */
	    event: TEvent;
	}
	export interface PathItem<TContext, TEvent extends EventObject> {
	    state: State<TContext, TEvent>;
	    path: Array<Segment<TContext, TEvent>>;
	    weight?: number;
	}
	export interface PathMap<TContext, TEvent extends EventObject> {
	    [key: string]: PathItem<TContext, TEvent>;
	}
	export interface PathsItem<TContext, TEvent extends EventObject> {
	    state: State<TContext, TEvent>;
	    paths: Array<Array<Segment<TContext, TEvent>>>;
	}
	export interface PathsMap<TContext, TEvent extends EventObject> {
	    [key: string]: PathsItem<TContext, TEvent>;
	}
	export interface TransitionMap {
	    state: StateValue | undefined;
	}
	export interface AdjacencyMap {
	    [stateId: string]: Record<string, TransitionMap>;
	}
	export interface ValueAdjacencyMap<TContext, TEvent extends EventObject> {
	    [stateId: string]: Record<string, State<TContext, TEvent>>;
	}
	export interface SCXMLEventMeta<TEvent extends EventObject> {
	    _event: SCXML.Event<TEvent>;
	}
	export interface StateMeta<TContext, TEvent extends EventObject> {
	    state: State<TContext, TEvent>;
	    _event: SCXML.Event<TEvent>;
	}
	export interface Typestate<TContext> {
	    value: StateValue;
	    context: TContext;
	}
	export interface StateLike<TContext> {
	    value: StateValue;
	    context: TContext;
	    event: EventObject;
	    _event: SCXML.Event<EventObject>;
	}
	export interface StateConfig<TContext, TEvent extends EventObject> {
	    value: StateValue;
	    context: TContext;
	    _event: SCXML.Event<TEvent>;
	    _sessionid: string | null;
	    historyValue?: HistoryValue | undefined;
	    history?: State<TContext, TEvent>;
	    actions?: Array<ActionObject<TContext, TEvent>>;
	    activities?: ActivityMap;
	    meta?: any;
	    events?: TEvent[];
	    configuration: Array<StateNode<TContext, any, TEvent>>;
	    transitions: Array<TransitionDefinition<TContext, TEvent>>;
	    children: Record<string, Actor>;
	    done?: boolean;
	}
	export interface StateSchema<TC = any> {
	    meta?: any;
	    context?: Partial<TC>;
	    states?: {
	        [key: string]: StateSchema<TC>;
	    };
	}
	export interface InterpreterOptions {
	    /**
	     * Whether state actions should be executed immediately upon transition. Defaults to `true`.
	     */
	    execute: boolean;
	    clock: Clock;
	    logger: (...args: any[]) => void;
	    parent?: Interpreter<any, any, any>;
	    /**
	     * If `true`, defers processing of sent events until the service
	     * is initialized (`.start()`). Otherwise, an error will be thrown
	     * for events sent to an uninitialized service.
	     *
	     * Default: `true`
	     */
	    deferEvents: boolean;
	    /**
	     * The custom `id` for referencing this service.
	     */
	    id?: string;
	    /**
	     * If `true`, states and events will be logged to Redux DevTools.
	     *
	     * Default: `false`
	     */
	    devTools: boolean | object;
	    [option: string]: any;
	}
	export namespace SCXML {
	    interface Event<TEvent extends EventObject> {
	        /**
	         * This is a character string giving the name of the event.
	         * The SCXML Processor must set the name field to the name of this event.
	         * It is what is matched against the 'event' attribute of <transition>.
	         * Note that transitions can do additional tests by using the value of this field
	         * inside boolean expressions in the 'cond' attribute.
	         */
	        name: string;
	        /**
	         * This field describes the event type.
	         * The SCXML Processor must set it to: "platform" (for events raised by the platform itself, such as error events),
	         * "internal" (for events raised by <raise> and <send> with target '_internal')
	         * or "external" (for all other events).
	         */
	        type: 'platform' | 'internal' | 'external';
	        /**
	         * If the sending entity has specified a value for this, the Processor must set this field to that value
	         * (see C Event I/O Processors for details).
	         * Otherwise, in the case of error events triggered by a failed attempt to send an event,
	         * the Processor must set this field to the send id of the triggering <send> element.
	         * Otherwise it must leave it blank.
	         */
	        sendid?: string;
	        /**
	         * This is a URI, equivalent to the 'target' attribute on the <send> element.
	         * For external events, the SCXML Processor should set this field to a value which,
	         * when used as the value of 'target', will allow the receiver of the event to <send>
	         * a response back to the originating entity via the Event I/O Processor specified in 'origintype'.
	         * For internal and platform events, the Processor must leave this field blank.
	         */
	        origin?: string;
	        /**
	         * This is equivalent to the 'type' field on the <send> element.
	         * For external events, the SCXML Processor should set this field to a value which,
	         * when used as the value of 'type', will allow the receiver of the event to <send>
	         * a response back to the originating entity at the URI specified by 'origin'.
	         * For internal and platform events, the Processor must leave this field blank.
	         */
	        origintype?: string;
	        /**
	         * If this event is generated from an invoked child process, the SCXML Processor
	         * must set this field to the invoke id of the invocation that triggered the child process.
	         * Otherwise it must leave it blank.
	         */
	        invokeid?: string;
	        /**
	         * This field contains whatever data the sending entity chose to include in this event.
	         * The receiving SCXML Processor should reformat this data to match its data model,
	         * but must not otherwise modify it.
	         *
	         * If the conversion is not possible, the Processor must leave the field blank
	         * and must place an error 'error.execution' in the internal event queue.
	         */
	        data: TEvent;
	        /**
	         * @private
	         */
	        $$type: 'scxml';
	    }
	}
	export interface Unsubscribable {
	    unsubscribe(): void;
	}
	export interface Subscribable<T> {
	    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
	}
	export interface Observer<T> {
	    next: (value: T) => void;
	    error: (err: any) => void;
	    complete: () => void;
	}
	export type Spawnable = StateMachine<any, any, any> | Promise<any> | InvokeCallback | Subscribable<any>;
	export {};
	//# sourceMappingURL=types.d.ts.map
}
declare module 'Actor' {
	import { EventObject, Subscribable, InvokeDefinition, AnyEventObject, StateMachine, Spawnable, SCXML } from 'types';
	export interface Actor<TContext = any, TEvent extends EventObject = AnyEventObject> extends Subscribable<TContext> {
	    id: string;
	    send: (event: TEvent) => any;
	    stop?: () => any | undefined;
	    toJSON: () => {
	        id: string;
	    };
	    meta?: InvokeDefinition<TContext, TEvent>;
	    state?: any;
	    deferred?: boolean;
	}
	export function createNullActor(id: string): Actor;
	/**
	 * Creates a deferred actor that is able to be invoked given the provided
	 * invocation information in its `.meta` value.
	 *
	 * @param invokeDefinition The meta information needed to invoke the actor.
	 */
	export function createInvocableActor<TC, TE extends EventObject>(invokeDefinition: InvokeDefinition<TC, TE>, machine: StateMachine<TC, any, TE>, context: TC, _event: SCXML.Event<TE>): Actor;
	export function createDeferredActor(entity: Spawnable, id: string, data?: any): Actor;
	export function isActor(item: any): item is Actor;
	//# sourceMappingURL=Actor.d.ts.map
}
declare module 'SimulatedClock' {
	import { Clock } from 'interpreter';
	export interface SimulatedClock extends Clock {
	    start(speed: number): void;
	    increment(ms: number): void;
	    set(ms: number): void;
	}
	export class SimulatedClock implements SimulatedClock {
	    private timeouts;
	    private _now;
	    private _id;
	    now(): number;
	    private getId;
	    setTimeout(fn: (...args: any[]) => void, timeout: number): number;
	    clearTimeout(id: number): void;
	    private flushTimeouts;
	}
	//# sourceMappingURL=SimulatedClock.d.ts.map
}
declare module 'each' {
	import { EventObject, SingleOrArray, ActionObject } from '.';
	export function each<TContext, TEvent extends EventObject>(collection: keyof TContext, item: keyof TContext, actions: SingleOrArray<ActionObject<TContext, TEvent>>): ActionObject<TContext, TEvent>;
	export function each<TContext, TEvent extends EventObject>(collection: keyof TContext, item: keyof TContext, index: keyof TContext, actions: SingleOrArray<ActionObject<TContext, TEvent>>): ActionObject<TContext, TEvent>;
	//# sourceMappingURL=each.d.ts.map
}
declare module 'invoke' {
	export interface InvokedPromiseOptions {
	    id?: string;
	}
	export interface PromiseMachineSchema {
	    states: {
	        pending: {};
	        resolved: {};
	        rejected: {};
	    };
	}
	//# sourceMappingURL=invoke.d.ts.map
}
declare module 'json' {
	import { StateNode, ActionObject, Guard, InvokeDefinition } from './';
	interface JSONFunction {
	    $function: string;
	}
	export function stringifyFunction(fn: Function): JSONFunction;
	interface TransitionConfig {
	    target: string[];
	    source: string;
	    actions: Array<ActionObject<any, any>>;
	    cond: Guard<any, any> | undefined;
	    eventType: string;
	}
	interface StateNodeConfig {
	    type: StateNode['type'];
	    id: string;
	    key: string;
	    initial?: string;
	    entry: Array<ActionObject<any, any>>;
	    exit: Array<ActionObject<any, any>>;
	    on: {
	        [key: string]: TransitionConfig[];
	    };
	    invoke: Array<InvokeDefinition<any, any>>;
	    states: Record<string, StateNodeConfig>;
	}
	export function machineToJSON(stateNode: StateNode): StateNodeConfig;
	export function stringify(machine: StateNode): string;
	export function parse(machineString: string): StateNodeConfig;
	export function jsonify<T extends Record<string, any>>(value: T): T;
	export {};
	//# sourceMappingURL=json.d.ts.map
}
declare module 'patterns' {
	import { AtomicStateNodeConfig, StatesConfig, Event, EventObject, StateSchema } from 'types';
	export function toggle<TEventType extends string = string>(onState: string, offState: string, eventType: TEventType): Record<string, AtomicStateNodeConfig<any, {
	    type: TEventType;
	}>>;
	interface SequencePatternOptions<TEvent extends EventObject> {
	    nextEvent: Event<TEvent> | undefined;
	    prevEvent: Event<TEvent> | undefined;
	}
	export function sequence<TStateSchema extends StateSchema, TEvent extends EventObject>(items: Array<keyof TStateSchema['states']>, options?: Partial<SequencePatternOptions<TEvent>>): {
	    initial: keyof TStateSchema['states'];
	    states: StatesConfig<any, TStateSchema, TEvent>;
	};
	export {};
	//# sourceMappingURL=patterns.d.ts.map
}
declare module 'scxml' {
	import { StateNode } from 'index';
	export interface ScxmlToMachineOptions {
	    delimiter?: string;
	}
	export function toMachine(xml: string, options: ScxmlToMachineOptions): StateNode;
	//# sourceMappingURL=scxml.d.ts.map
}
