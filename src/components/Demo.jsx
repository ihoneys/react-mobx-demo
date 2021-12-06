import React from 'react';
import { observer, inject } from 'mobx-react';
import { get, set, observable, values, autorun } from 'mobx';

class Demo extends React.Component {
  render() {
    // console.log(this.props);
    return <div>demo</div>;
  }
}

let isMount = true; // 初始化
let workInProgressHook = null;
// App 组件对应的 fiber 对象
const fiber = {
  // 保存改 FunctionComponent 对应的 Hooks 链表
  memoizedState: null,
  // 指向 APP
  stateNode: App,
};

function run() {
  // 更新前将 workInProgressHook重置为fiber保存的 第一个 Hook
  workInProgressHook = fiber.memoizedState;
  // 触发组件render
  const app = fiber.stateNode();
  // 组件首次render为mount，以后再触发的更新为 update
  isMount = false;
  return app;
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };
  // 环状单向链表操作
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  run();
}

function useState(initialState) {
  // debugger
  let hook;

  if (isMount) {
    hook = {
      // 保存 update 的queue，
      queue: {
        pending: null,
      },
      // 保存hook对应的 state
      memoizedState: initialState,
      // 与下一个 Hook连接形成单向无环链表
      next: null,
    };
    // 将 hook 插入 fiber.memoizedState链表末尾
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    // 移动workInProgressHook指针
    workInProgressHook = hook;
  } else {
    // update时找到对应 hook
    hook = workInProgressHook;
    // 移动workInProgressHook 指针
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    // 获取update环状单向链表中第一个update
    let firstUpdate = hook.queue.pending.next;

    do {
      // 执行 updata action
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;

      // 最后一个update执行完成后跳出循环
    } while (firstUpdate !== hook.queue.pending.next);

    // 情况queue.pending
    hook.queue.pending = null;
  }

  // 将 update action 执行完后的 state作为 memoizedState
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function App() {
  const [num, updateNum] = useState(0);
  console.log('isMount:---->', isMount);
  console.log('num:--->', num);
  return {
    onClick() {
      updateNum((num) => num + 1);
    },
  };
}

window.app = run();

export default Demo;
