import type { Meta, StoryObj } from '@storybook/svelte';

import Button from './Button.svelte';

const meta = {
  title: 'Theme/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    controlSize: {
      control: { type: "select" },
      options: ["mini", "small", "regular", "large"]
    },
    buttonStyle: {
      control: { type: "select" },
      options: ["borderless", "bordered", "borderedProminent"]
    }
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Filled: Story = {
  args: {
    label: 'Save',
    buttonStyle: 'borderedProminent',
    controlSize: "regular"
  },
};