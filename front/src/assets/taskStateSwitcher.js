export const setCurrentTaskStateToOff = async (
  processingTask,
  errorSetTaskStateToOff,
  mutateCurrentTaskPauseOff,
  mutateCurrentTaskPlayOff,
  updateTaskState
) => {
  if (processingTask.length > 0) {
    const currenTaskId = processingTask.reduce((a, b) => a + b).id;
    const currentTaskState = processingTask.reduce((a, b) => a + b).taskState;
    const currentSessionId = [...processingTask.reduce((a, b) => a + b).session]
      .map((item) => item.session_id)
      .reduce((a, b) => Math.max(a, b));

    if (currentTaskState === 'isPause') {
      await mutateCurrentTaskPauseOff(
        updateTaskState,
        currenTaskId,
        errorSetTaskStateToOff
      ).then(() => {
        return true;
      });
    }
    if (currentTaskState === 'isPlay') {
      mutateCurrentTaskPlayOff(
        updateTaskState,
        currenTaskId,
        errorSetTaskStateToOff,
        currentSessionId
      ).then(() => {
        true;
      });
    }
  }
};

export const setCurrentTaskToPlay = async (
  processingTask,
  errorOnMutateTaskStateToPlay,
  mutateTaskStateToPlay,
  updateTaskStateToPlay
) => {
  if (processingTask.length > 0) {
    const currentTaskId = processingTask.reduce((a, b) => a + b).id;
    const currentTaskState = processingTask.reduce((a, b) => a + b).taskState;
    const currentSessionId = [...processingTask.reduce((a, b) => a + b).session]
      .map((item) => item.session_id)
      .reduce((a, b) => Math.max(a, b));

    if (currentTaskState === 'isPause' || currentTaskState === 'isOff') {
      (async () => {
        mutateTaskStateToPlay(
          updateTaskStateToPlay,
          currentTaskId,
          errorOnMutateTaskStateToPlay,
          currentSessionId
        );
      })();
    }
  }
};

export const setCurrentTaskToPause = (
  processingTask,
  errorOnSetTaskStateToPause,
  mutateTaskStateToPause,
  updateTaskStateToPause
) => {
  if (processingTask.length > 0) {
    const currentTaskId = processingTask.reduce((a, b) => a + b).id;
    const currentTaskState = processingTask.reduce((a, b) => a + b).taskState;
    const currentSessionId = [...processingTask.reduce((a, b) => a + b).session]
      .map((item) => item.session_id)
      .reduce((a, b) => Math.max(a, b));
    if (currentTaskState === 'isPlay') {
      (async () => {
        await mutateTaskStateToPause(
          updateTaskStateToPause,
          currentTaskId,
          errorOnSetTaskStateToPause,
          currentSessionId
        );
      })();
    }
  }
};
