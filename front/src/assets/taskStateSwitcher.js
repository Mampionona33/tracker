export const setCurrentTaskStateToOff = async (
  processingTask,
  errorSetTaskStateToOff,
  setCurrentTaskPauseOff,
  setCurrentTaskPlayOff,
  updateTaskState
) => {
  if (processingTask.length > 0) {
    const currenTaskId = processingTask.reduce((a, b) => a + b).id;
    const currentTaskState = processingTask.reduce((a, b) => a + b).taskState;
    const currentSessionId = Array.from(
      processingTask.reduce((a, b) => a + b).session
    )
      .map((item) => item.session_id)
      .reduce((a, b) => Math.max(a, b));

    if (currentTaskState === 'isPause') {
      await setCurrentTaskPauseOff(
        updateTaskState,
        currenTaskId,
        errorSetTaskStateToOff
      ).then(() => {
        return true;
      });
    }
    if (currentTaskState === 'isPlay') {
      setCurrentTaskPlayOff(
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
