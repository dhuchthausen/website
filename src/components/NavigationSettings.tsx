import React, { FC } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import styled from "styled-components";

const Label = styled.label`
  padding-left: 0.75rem;
`;

type OptionObject = {
  label: string;
  value: string;
};

type Option = string | OptionObject;

type SettingProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

const isOptionObject = (opt: Option): opt is OptionObject => {
  return !!(opt as OptionObject).label;
};

const createOption = (opt: Option) => {
  let label;
  let value;
  if (isOptionObject(opt)) {
    label = opt.label;
    value = opt.value;
  } else {
    label = opt as string;
    value = opt as string;
  }
  return (
    <option key={value} value={value}>
      {label}
    </option>
  );
};

const Setting: FC<SettingProps> = ({ label, value, options, onChange }) => (
  <div className="columns is-horizontal field">
    <div className="field-label column has-text-left is-one-third is-vcentered">
      <Label>{label}</Label>
    </div>
    <div className="field-body column">
      <div className="field">
        <div className="control">
          <div className="select is-fullwidth">
            <select
              className="is-fullwidth"
              onChange={e => onChange(e.target.value)}
              value={value}
            >
              {options.map(createOption)}
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const changeVersion = (path: string, version: string) => {
  navigate(replacePathPart(path, 2, version));
};

const changeLanguage = (path: string, lang: string) => {
  navigate(replacePathPart(path, 3, lang));
};

const findVersion = (path: string) => {
  return findPathPart(path, 2);
};

const findLanguage = (path: string) => {
  return findPathPart(path, 3);
};

const findPathPart = (path: string, index: number) => {
  return path.split("/")[index];
};

const replacePathPart = (path: string, index: number, newPart: string) => {
  const pathParts = path.split("/");
  pathParts[index] = newPart;
  return pathParts.join("/");
};

type Props = {
  path: string;
};

const NavigationSettings: FC<Props> = ({ path }) => {
  const data = useStaticQuery(versionAndLanguage);
  return (
    <>
      <p className="menu-label">Settings</p>
      <Setting
        label="Version"
        value={findVersion(path)}
        options={data.versions.group
          .map(g => g.fieldValue)
          .sort()
          .reverse()}
        onChange={version => changeVersion(path, version)}
      />
      <Setting
        label="Language"
        value={findLanguage(path)}
        options={data.languages.childrenLanguagesYaml}
        onChange={language => changeLanguage(path, language)}
      />
    </>
  );
};

const versionAndLanguage = graphql`
  query {
    languages: file(relativePath: { eq: "docs/languages.yml" }) {
      childrenLanguagesYaml {
        label
        value
      }
    }
    versions: allMarkdownRemark {
      group(field: fields___version) {
        fieldValue
      }
    }
  }
`;

export default NavigationSettings;