import styled from 'styled-components';

export const customStyle = {
  rows: {
    style: {
      '@media (max-width : 650px)': {
        display: 'block',
        width: '100%',
      },
    },
  },

  cells: {
    style: {
      '@media (max-width : 650px)': {
        justifyContent: 'flex-end',
        content: 'test',
        margin: '0.2rem',
      },
    },
  },

  headRow: {
    style: {
      '@media (max-width : 650px)': {
        display: 'none',
      },
    },
  },
};

export const PendingTaskTableCont = styled.div`
  position: absolute;
  top: 5rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  & .rdt_TableBody > .rdt_TableRow:nth-child(even) {
    background-color: #cfd8dc;
  }
  & .rdt_TableBody > .rdt_TableRow:nth-child(odd) {
    background-color: #f5f5f5;
  }
  @media screen and (max-width: 650px) {
    & .rdt_TableCell {
      justify-content: space-between;
      gap: 0.5rem;
    }
    & .rdt_TableCell > * {
      display: flex;
      justify-content: flex-start;
      gap: 0.5rem;
      width: 100%;
    }
    & .rdt_TableCell:nth-child(1) {
      ::before {
        white-space: nowrap;
        content: 'BOOTH NUMBER : ';
      }
    }
    & .rdt_TableCell:nth-child(2) {
      ::before {
        white-space: nowrap;
        content: 'STATUS COM : ';
      }
    }
    & .rdt_TableCell:nth-child(3) {
      ::before {
        white-space: nowrap;
        content: 'CAT : ';
      }
    }
    & .rdt_TableCell:nth-child(4) {
      ::before {
        white-space: nowrap;
        content: 'NB BEFORE : ';
      }
    }
    & .rdt_TableCell:nth-child(5) {
      ::before {
        white-space: nowrap;
        content: 'NB AFTER : ';
      }
    }
  }
`;
